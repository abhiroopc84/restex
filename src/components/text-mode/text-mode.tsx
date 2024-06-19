import { Button } from "../ui/button";
import { PdfPreviewer } from "./pdf-preview";
import { TextEditor } from "./text-editor";
import escapeFunction from "@/utils/escape";
import { toast } from "sonner";
import yamlParser from "@/utils/yaml-parser";
import faangpath from "@/templates/faangpath";
import { formatLaTeX } from "@/utils/latex-formatter";
import latexCompiler from "@/utils/latex-compiler";
import { useContext, useEffect, useState } from "react";
import { YamlContext } from "../../context/yaml-provider";
import { ErrorContext } from "../../context/error-provider";
import { ErrorOpenContext } from "../../context/erroropen-provider";
import { CompileStatusContext } from "../../context/compilestatus-provider";
import { LatexContext } from "../../context/latex-provider";
import { PdfurlContext } from "../../context/pdfurl-provider";
import markdownToLatex from "@/utils/markdown-parser";
import { EngineContext } from "../../context/engine-provider";

export const TextMode = () => {
  const { yaml } = useContext(YamlContext);
  const { setError } = useContext(ErrorContext);
  const { setErrorOpen } = useContext(ErrorOpenContext);
  const { compileStatus, setCompileStatus } = useContext(CompileStatusContext);
  const { setLatex } = useContext(LatexContext);
  const { setPdfurl } = useContext(PdfurlContext);
  const { engine } = useContext(EngineContext);
  const [compilePromiseResolve, setCompilePromiseResolve] = useState(null);

  useEffect(()=>{
    if(compileStatus == "success" && compilePromiseResolve){
      compilePromiseResolve("Render Successful!");
    }
  },[compileStatus, compilePromiseResolve]);

  const handleRender = () => {
    if (yaml == "") {
      toast.error("Resume content cannot be empty.");
    } else {
      const value = escapeFunction(yaml);
      const yamlResult = yamlParser(value, setError);
      console.log(yamlResult);
      if (!yamlResult) {
        toast("Uh oh! Something went wrong.", {
          action: {
            label: "Show details",
            onClick: () => setErrorOpen((prev: boolean) => !prev),
          },
        });
      } else {
        setCompileStatus(()=>"inprogress");
        const compilePromise = new Promise((resolve)=>{
          setCompilePromiseResolve(()=>resolve)
        })
        toast.promise(compilePromise, {
          loading: 'Rendering...',
          success: (data) => {
            return `${data}`;
          },
          error: 'Error Occured!',
        });
        const mdLatexCode = faangpath(yamlResult);
        const latexCode = markdownToLatex(mdLatexCode);
        const fCode = formatLaTeX(latexCode);
        (() => {
          setLatex(fCode);
        })();
        console.log(latexCode);
        const url = latexCompiler(latexCode, engine);
        url.then((value) => {
          if (value) {
            setCompileStatus(()=>"success");
            setPdfurl(()=>value);
          }
        });
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-[85vh] grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <TextEditor />
        <PdfPreviewer />
        <div className="flex items-center space-x-2">
          <Button onClick={handleRender}>Render</Button>
        </div>
      </div>
    </div>
  );
};
