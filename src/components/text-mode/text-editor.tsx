import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import TextareaCodeEditor from "@uiw/react-textarea-code-editor";

export const TextEditor = ({content, setContent}: {content: string | number | readonly string[] | undefined, setContent: (arg0: string) => void}) => {
    return (<ScrollArea className="w-full h-full overflow-auto rounded-md outline-offset-0 outline-2 outline outline-[#ebe9e5] dark:outline-[#1f242b] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#7c3aed] focus-within:dark:ring-[#6d28d9]">
        <TextareaCodeEditor
          value={content}
          language="yaml"
          placeholder="Enter resume content."
          onChange={(evn) => setContent(evn.target.value)}
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