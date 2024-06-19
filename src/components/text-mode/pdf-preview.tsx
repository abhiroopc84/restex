import { useContext } from "react";
import { CompileStatusContext } from "../../context/compilestatus-provider";
import { PdfurlContext } from "../../context/pdfurl-provider";

export const PdfPreviewer = () => {
  const {compileStatus} = useContext(CompileStatusContext);
  const {pdfurl} = useContext(PdfurlContext);

  return (
    <div className="rounded-md border bg-muted">
      {compileStatus=="success" && (
        <object
          data={pdfurl}
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>
      )}
    </div>
  );
};
