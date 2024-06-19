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
import { TriangleAlert } from "lucide-react";
import { useContext } from "react";
import { ErrorContext } from "../../context/error-provider";
import { ErrorOpenContext } from "../../context/erroropen-provider";

export function ErrorConsole() {
  const { error } = useContext(ErrorContext);
  const { errorOpen, setErrorOpen } = useContext(ErrorOpenContext);

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
            variant="secondary"
            disabled={error == "" ? true : false}
          >
            <TriangleAlert className="mr-2 h-4 w-4"/>Errors
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
            <ScrollArea className="rounded-md bg-black p-2 max-w-[625px] h-[50vh]">
              <TextareaCodeEditor
                value={error}
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
