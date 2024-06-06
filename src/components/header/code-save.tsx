import { Download } from "lucide-react";
import { Button } from "../ui/button";

export function CodeSave({content}:{content:string}) {

  const handleSave = () => {
    const url = window.URL.createObjectURL(new Blob([content]));
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
      variant="outline"
      disabled={content == "" ? true : false}
      onClick={handleSave}
    >
      <Download className="mr-2 h-4 w-4" />
      YAML
    </Button>
  );
}
