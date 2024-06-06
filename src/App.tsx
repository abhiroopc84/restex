/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useState } from "react";
import "@/index.css";
import { Sidebar } from "./components/sidebar/sidebar";
import { Header } from "./components/header/header";
import { handleRender } from "./helpers/handle-render";
import { TextMode } from "./components/text-mode/text-mode";

export default function App() {
  const [errorContent, setErrorContent] = useState<string>("");
  const [template, setTemplate] = useState("faangpath");
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [compiled, setCompiled] = useState<string>("false");
  const [pdfURL, setPdfURL] = useState<string>("");

  const renderHandler = () => {
    handleRender(content,setErrorContent,setErrorOpen,setCompiled,setCode,setPdfURL);
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
      <>
        <div className="h-dvh flex-col md:flex">        
          <Header content={content} setContent={setContent} errorContent={errorContent} errorOpen={errorOpen} setErrorOpen={setErrorOpen} code={code}/>
          <Tabs defaultValue="text" className="flex-1">
            <div className="w-full p-6 h-full py-6">
              <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                <Sidebar template={template} setTemplate={setTemplate} />
                <div className="md:order-1">
                  <TabsContent value="text" className="mt-0 border-0 p-0">
                    <TextMode content={content} setContent={setContent} compiled={compiled} pdfURL={pdfURL} renderHandler={renderHandler}/>
                  </TabsContent> 
                  <TabsContent value="gui" className="mt-0 border-0 p-0">
                    <div className="flex h-[75vh] w-full flex-col space-y-4">
                      <div className="flex items-center space-x-2">
                        <Button onClick={renderHandler}>Submit</Button>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </>
    </ThemeProvider>
  );
}
