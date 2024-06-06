import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TextareaCodeEditor from "@uiw/react-textarea-code-editor";
import { CopyIcon, View } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

export function CodeViewer({ code }: { code: string }) {
  const onCopyHandler = (_text: string, result: boolean) => {
    if (result) {
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Failed to copy text. Please try again.");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={code == "" ? true : false}>
            <View className="mr-2 h-4 w-4" />
            LaTeX
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>LaTeX Code</DialogTitle>
            <DialogDescription>
              You can use the following code to render a pdf or make other changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <ScrollArea className="rounded-md bg-black p-2 max-w-[625px] h-[50vh]">
              <TextareaCodeEditor
                value={code}
                language="javascript"
                placeholder="Enter resume content."
                disabled
                padding={15}
                minHeight={500}
                style={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="absolute bottom-9 right-9">
              <CopyToClipboard text={code} onCopy={onCopyHandler}>
                <Button size="icon">
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </CopyToClipboard>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
