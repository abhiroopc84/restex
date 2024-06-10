import { ErrorConsole } from "./error-console";
import { CodeViewer } from "./code-viewer";
import { Actions } from "./actions";
import { Separator } from "../ui/separator";
import { CodeSave } from "./code-save";
import { Bolt } from "lucide-react";


export const Header = () => {
  return (
    <>
      <div className="w-full px-4 flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <Bolt className="mr-2 h-5 w-5 hover:animate-spin"/>
        <h2 className="text-base font-bold">restex/</h2>
        <h2 className="text-base font-light">playground</h2>
        <div className="ml-auto my-1 flex space-x-2 sm:justify-end">
          <CodeSave />
          <div className="hidden space-x-2 md:flex">
            <ErrorConsole />
            <CodeViewer />
          </div>
          <Actions />
        </div>
      </div>
      <Separator />
    </>
  );
};
