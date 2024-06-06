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
import { CircleAlert } from "lucide-react";

export function ErrorConsole({errorContent, errorOpen, setErrorOpen}:{errorContent: string, errorOpen: boolean, setErrorOpen: (arg0: (prev: boolean) => boolean) => void}) {
  return (
    <>
      <Dialog
        open={errorOpen}
        onOpenChange={() => {
          (()=>setErrorOpen((prev: boolean) => !prev))();
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="outline-offset-0 enabled:dark:bg-[#2d0607] enabled:bg-[#fff0f0] enabled:outline-2 enabled:outline enabled:dark:outline-[#4d0408] enabled:outline-[#FFE0E1]"
            disabled={errorContent == "" ? true : false}
          >
            <CircleAlert className="mr-2 h-4 w-4"/>Errors
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Errors</DialogTitle>
            <DialogDescription>
              You can see the detailed errors here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <ScrollArea className="rounded-md bg-black p-6 max-w-[625px] h-[50vh]">
              <TextareaCodeEditor
                value={errorContent}
                language="javascript"
                placeholder="No errors!"
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
