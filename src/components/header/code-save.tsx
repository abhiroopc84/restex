import { HardDriveDownload } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { YamlContext } from "../context/yaml-provider";
import { ErrorContext } from "../context/error-provider";
import { CompileStatusContext } from "../context/compilestatus-provider";

export const CodeSave = () => {
  const { yaml } = useContext(YamlContext);
  const { error } = useContext(ErrorContext);
  const { compileStatus } = useContext(CompileStatusContext);

  const handleSave = () => {
    const url = window.URL.createObjectURL(new Blob([yaml]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.yaml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  return (
    <Button
      variant="secondary"
      disabled={error != "" || compileStatus == "notstarted" ? true : false}
      onClick={handleSave}
    >
      <HardDriveDownload className="mr-2 h-4 w-4" />
      YAML
    </Button>
  );
}
