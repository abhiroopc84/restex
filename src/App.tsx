/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/mode-toggle";
import "@/index.css";
import { Sidebar } from "./components/sidebar/sidebar";
import { Header } from "./components/header/header";
import { TextMode } from "./components/text-mode/text-mode";
import { GuiMode } from "./components/gui-mode/gui-mode";
import { ErrorProvider } from "./context/error-provider";
import { CompileStatusProvider } from "./context/compilestatus-provider";
import { ErrorOpenProvider } from "./context/erroropen-provider";
import { LatexProvider } from "./context/latex-provider";
import { PdfurlProvider } from "./context/pdfurl-provider";
import { TemplateProvider } from "./context/template-provider";
import { YamlProvider } from "./context/yaml-provider";
import { SectionsProvider } from "./context/sections-provider";
import { EngineProvider } from "./context/engine-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <EngineProvider>
        <ErrorProvider>
          <CompileStatusProvider>
            <ErrorOpenProvider>
              <LatexProvider>
                <PdfurlProvider>
                  <TemplateProvider>
                    <YamlProvider>
                      <SectionsProvider>
                        <div className="fixed bottom-4 right-4">
                          <ModeToggle />
                        </div>
                        <>
                          <div className="h-dvh flex-col md:flex">
                            <Header />
                            <Tabs defaultValue="text" className="flex-1">
                              <div className="w-full p-6 h-full py-6">
                                <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                                  <Sidebar />
                                  <div className="md:order-1">
                                    <TabsContent
                                      value="text"
                                      className="mt-0 border-0 p-0"
                                    >
                                      <TextMode />
                                    </TabsContent>
                                    <TabsContent
                                      value="gui"
                                      className="mt-0 border-0 p-0"
                                    >
                                      <div className="flex h-[75vh] w-full flex-col space-y-4">
                                        <GuiMode />
                                      </div>
                                    </TabsContent>
                                  </div>
                                </div>
                              </div>
                            </Tabs>
                          </div>
                        </>
                      </SectionsProvider>
                    </YamlProvider>
                  </TemplateProvider>
                </PdfurlProvider>
              </LatexProvider>
            </ErrorOpenProvider>
          </CompileStatusProvider>
        </ErrorProvider>
      </EngineProvider>
    </ThemeProvider>
  );
}
