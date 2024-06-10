import { useContext } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import TextareaCodeEditor from "@uiw/react-textarea-code-editor";
import { YamlContext } from "../context/yaml-provider";

export const TextEditor = () => {
    const {yaml, setYaml} = useContext(YamlContext);
    
    return (<ScrollArea className="w-full h-full overflow-auto rounded-md border border-input focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
        <TextareaCodeEditor
          value={yaml}
          language="yaml"
          placeholder="Enter resume content."
          onChange={(evn) => setYaml(evn.target.value)}
          padding={15}
          minHeight={500}
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>)
} 