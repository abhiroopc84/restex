/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as monaco from "monaco-editor";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeViewer } from "./components/code-viewer";
import { PresetActions } from "./components/preset-actions";
import { PresetSave } from "./components/preset-save";
import { PresetShare } from "./components/preset-share";
import { ModeToggle } from "./components/mode-toggle";
import { AppWindowMac, Columns2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Textarea } from "./components/ui/textarea";
import Editor, { loader } from "@monaco-editor/react";
import { Skeleton } from "./components/ui/skeleton";
import yamlParser from "./helpers/yaml-parser";
import { ToastAction } from "./components/ui/toast";

export default function App() {
  const [format, setFormat] = useState("");
  const [errorContent, setErrorContent] = useState([]);
  const editorRef = useRef(null);
  const [theme, setTheme] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  monaco.editor.defineTheme("abc", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.foreground": "#F8F8F8",
      "editor.background": "#000000F7",
      "editor.selectionBackground": "#668CDB9C",
      "editor.lineHighlightBackground": "#F2ECFF1F",
      "editorCursor.foreground": "#FFFFFF",
      "editorWhitespace.foreground": "#616D793D",
    },
  });
  monaco.editor.setTheme("abc");

  loader.config({ monaco });

  const handleSubmit = () => {
    const current = editorRef.current;
    let content;
    if (current != null) {
      content = current.getValue();
    }
    if (content == "") {
      toast({
        variant: "destructive",
        description: "Resume content cannot be empty.",
      });
    } else {
      const yamlResult = yamlParser(content, setErrorContent);
      console.log(yamlResult);
      if (!yamlResult) {
        toast({
          variant: "destructive",
          title: `Uh oh! Something went wrong.`,
          description: `There was a problem with your request.`,
          action: (
            <ToastAction
              altText="Show details"
              onClick={() => setErrorOpen((prev: boolean) => !prev)}
            >
              Show details
            </ToastAction>
          ),
        });
      }
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="position: fixed bottom-4 right-4">
        <ModeToggle />
      </div>
      <>
        <Toaster />
        <div className="h-dvh flex-col md:flex">
          <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
            <h2 className="text-lg font-bold">restex/</h2>
            <h2 className="text-lg font-light">playground</h2>
            <div className="ml-auto flex space-x-2 sm:justify-end">
              <PresetSave />
              <div className="hidden space-x-2 md:flex">
                <Dialog
                  open={errorOpen}
                  onOpenChange={() => {
                    setErrorOpen((prev) => !prev);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="secondary">Errors</Button>
                  </DialogTrigger>
                  <DialogContent className="flex flex-col h-96 items-center">
                    <DialogHeader>
                      <DialogTitle>Errors</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="w-full rounded-md">
                      <pre className="rounded-md bg-black p-8 min-h-96">
                        <code className="text-white">
                          <ul className=" list-outside list-image-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=)]">
                            {errorContent.length != 0 ? (
                              errorContent.map((e) => (
                                <li key={Math.random()}>
                                  {"> "}
                                  {e}
                                </li>
                              ))
                            ) : (
                              <li>{"> No errors!"}</li>
                            )}
                          </ul>
                        </code>
                      </pre>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <CodeViewer />
                <PresetShare />
              </div>
              <PresetActions />
            </div>
          </div>
          <Separator />
          <Tabs defaultValue="external" className="flex-1">
            <div className="container h-full py-6">
              <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                  <div className="grid gap-2">
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Mode
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="w-[320px] text-sm"
                        side="left"
                      >
                        Choose the interface that best suits you. You can choose
                        to preview the result in a new window, or in the same
                        one.
                      </HoverCardContent>
                    </HoverCard>
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="external">
                        <span className="sr-only">External</span>
                        <AppWindowMac className="h-5 w-5" />
                      </TabsTrigger>
                      <TabsTrigger value="internal">
                        <span className="sr-only">Internal</span>
                        <Columns2 className="h-5 w-5" />
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <div className="grid gap-2">
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Format
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="w-[320px] text-sm"
                        side="left"
                      >
                        Select the format that you are comfortable with. You can
                        choose JSON which is simple, or YAML which is
                        human-readable.
                      </HoverCardContent>
                    </HoverCard>
                    <Select onValueChange={(event) => setFormat(event)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="yaml">YAML</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <HoverCard openDelay={200}>
                      <HoverCardTrigger asChild>
                        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Theme
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="w-[320px] text-sm"
                        side="left"
                      >
                        Select the theme that best suits you.
                      </HoverCardContent>
                    </HoverCard>
                    <Select onValueChange={(event) => setTheme(event)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="basic">Basic</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="md:order-1">
                  <TabsContent value="external" className="mt-0 border-0 p-0">
                    <div className="flex h-full flex-col space-y-4">
                      <div className="rounded-md border-8 w-[75vw] border-black">
                        <Editor
                          height="77vh"
                          width="74vw"
                          defaultLanguage="yaml"
                          defaultValue=""
                          onMount={handleEditorDidMount}
                          theme="abc"
                          loading={
                            <Skeleton className="h-[90vh] w-full rounded-md" />
                          }
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button onClick={handleSubmit}>Submit</Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="internal" className="mt-0 border-0 p-0">
                    <div className="flex flex-col space-y-4">
                      <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                        <Textarea
                          placeholder="Write the content of your Resume/CV."
                          className="h-full min-h-[300px] p-4 lg:min-h-[700px] xl:min-h-[700px]"
                        />
                        <div className="rounded-md border bg-muted"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button>Submit</Button>
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
