import { MouseEventHandler } from "react";
import { Button } from "../ui/button";
import { PdfPreviewer } from "./pdf-preview";
import { TextEditor } from "./text-editor";

export const TextMode = ({content, setContent, compiled, pdfURL, renderHandler}:{content: string, setContent: (arg0: string) => void, compiled: string, pdfURL: string, renderHandler: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-[85vh] grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <TextEditor content={content} setContent={setContent} />
        <PdfPreviewer compiled={compiled} pdfURL={pdfURL} />
        <div className="flex items-center space-x-2">
          <Button onClick={renderHandler}>Render</Button>
        </div>
      </div>
    </div>
  );
};
