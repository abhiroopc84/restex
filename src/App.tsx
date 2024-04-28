import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
import { useState } from "react";
import resumeString from "./constants/sample-resume";
import { parse } from "yaml";
import Resume from "@/models/resume";
import { toast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import { ToastAction } from "./components/ui/toast";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./components/ui/drawer";
import BulletSchema from "@/models/bullet";
import EducationSchema from "@/models/education";
import ExperienceSchema from "@/models/experience";
import GeneralSchema from "@/models/general";
import OnelineSchema from "@/models/oneline";
import PublicationSchema from "@/models/publication";
import TextSchema from "./models/text";
import { ZodType } from "zod";
import { ScrollArea } from "./components/ui/scroll-area";
import { Textarea } from "./components/ui/textarea";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schemas: { [key: string]: ZodType<any, any, any> } = {
  text: TextSchema,
  education: EducationSchema,
  experience: ExperienceSchema,
  general: GeneralSchema,
  oneline: OnelineSchema,
  publication: PublicationSchema,
  bullet: BulletSchema,
};

const yamlParser = (content, setConsoleContent) => {
  const resumeObject: {
    header: object;
    sections: { [key: string]: { type: string; content: [object] } };
  } = {
    header: {},
    sections: {},
  };
  const parsed = parse(content);
  console.log(parsed);
  //header parse
  const headerResult = Resume.safeParse(parsed.resume);
  if (!headerResult.success) {
    headerResult.error.issues.forEach((issue) =>
      console.log(issue.path + " " + issue.message)
    );
  } else {
    resumeObject.header = headerResult.data.header;
  }

  //sections parse
  const sections = parsed.resume.sections;
  resumeObject.sections = JSON.parse(JSON.stringify(sections));
  // eslint-disable-next-line prefer-const
  for (let i in resumeObject.sections) {
    resumeObject.sections[i] = { type: "", content: [{}] };
  }
  const sectionKeys: string[] = Object.keys(sections);
  let error = false;
  // eslint-disable-next-line prefer-const
  for (let i in sectionKeys) {
    if (Object.keys(schemas).includes(sections[sectionKeys[i]].type)) {
      // eslint-disable-next-line prefer-const
      for (let j in sections[sectionKeys[i]].content) {
        const result = schemas[sections[sectionKeys[i]].type].safeParse(
          sections[sectionKeys[i]].content[j]
        );
        if (result.success) {
          resumeObject.sections[sectionKeys[i] as string].content.push({
            title: sectionKeys[i],
            schema: sections[sectionKeys[i]].type,
            content: schemas[sections[sectionKeys[i]].type].parse(
              sections[sectionKeys[i]].content[j]
            ),
          });
        } else {
          console.log("Error" + sections[sectionKeys[i]].type);
          setConsoleContent((prevContent) => [
            ...prevContent,
            `Type Error: ${
              sections[sectionKeys[i]].type
            } entry at \n${JSON.stringify(
              sections[sectionKeys[i]].content[j],
              null,
              2
            )} \n${result.error.issues.map(
              (issue) => issue.path + " - " + issue.message + "\n"
            )}`,
          ]);
          toast({
            variant: "destructive",
            title: `Uh oh! Something went wrong.`,
            description: `There was a problem with your request.`,
            action: (
              <ToastAction altText="Show details">Show details</ToastAction>
            ),
          });
          error = true;
        }
      }
    }
  }
  if (error == true) {
    return false;
  }
  return resumeObject;
};

export default function App() {
  const [format, setFormat] = useState("");
  const [theme, setTheme] = useState("");
  const [content, setContent] = useState("");
  const [consoleContent, setConsoleContent] = useState([]);

  const handleSubmit = () => {
    if (content == "") {
      toast({
        variant: "destructive",
        description: "Resume content cannot be empty.",
      });
    } else {
      yamlParser(content, setConsoleContent);
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
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="secondary">Console</Button>
                  </DrawerTrigger>
                  <DrawerContent className="flex flex-col h-96 items-center">
                    <DrawerHeader>
                      <DrawerTitle>Console</DrawerTitle>
                    </DrawerHeader>
                    <ScrollArea className="w-full">
                      <pre className="mt-2 m-10 rounded-md bg-black p-8 min-h-96">
                        <code className="text-white">
                          <ul className=" list-outside list-image-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=)]">
                            {consoleContent.map((e) => (
                              <li>{e}</li>
                            ))}
                          </ul>
                        </code>
                      </pre>
                    </ScrollArea>
                  </DrawerContent>
                </Drawer>
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
                      <Textarea
                        placeholder="Write the content of your Resume/CV."
                        className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                      />
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
