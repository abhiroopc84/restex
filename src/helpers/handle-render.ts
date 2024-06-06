import { toast } from "sonner";
import escapeFunction from "./escape";
import yamlParser from "./yaml-parser";
import faangpath from "@/templates/faangpath";
import { formatLaTeX } from "./latex-formatter";
import latexCompiler from "./latex-compiler";

export const handleRender = (content: string, setErrorContent: (arg0: string) => void, setErrorOpen: (arg0: (prev: boolean) => boolean) => void, setCompiled: (arg0: string) => void, setCode: (arg0: string) => void, setPdfURL: (arg0: string) => void) => {
    if (content == "") {
      toast.error("Resume content cannot be empty.");
    } else {
      const value = escapeFunction(content);
      const yamlResult = yamlParser(value, setErrorContent);
      console.log(yamlResult);
      if (!yamlResult) {
        toast("Uh oh! Something went wrong.", {
          action: {
            label: "Show details",
            onClick: () => setErrorOpen((prev: boolean) => !prev),
          },
        });
      } else {
        setCompiled("ongoing");
        const latexCode = faangpath(yamlResult);
        const fCode = formatLaTeX(latexCode);
        (() => {
          setCode(fCode);
        })();
        console.log(latexCode);
        const url = latexCompiler(latexCode);
        url.then((value) => {
          if (value) {
            setCompiled("finished");
            setPdfURL(value);
          }
        });
      }
    }
  };