import { ErrorConsole } from "./error-console";
import { CodeViewer } from "./code-viewer";
import { Actions } from "./actions";
import { Separator } from "../ui/separator";
import { CodeSave } from "./code-save";

export const Header = ({content, setContent, errorContent, errorOpen, setErrorOpen, code }:{content: string, setContent: (arg0: string) => void, errorContent: string, errorOpen: boolean, setErrorOpen: (arg0: (prev: boolean) => boolean) => void, code: string}) => {
  return (
    <>
      <div className="w-full p-4 flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-bold">restex/</h2>
        <h2 className="text-lg font-light">playground</h2>
        <div className="ml-auto flex space-x-2 sm:justify-end">
          <CodeSave content={content}/>
          <div className="hidden space-x-2 md:flex">
            <ErrorConsole
              errorContent={errorContent}
              errorOpen={errorOpen}
              setErrorOpen={setErrorOpen}
            />
            <CodeViewer code={code} />
          </div>
          <Actions setContent={setContent} />
        </div>
      </div>
      <Separator />
    </>
  );
};
