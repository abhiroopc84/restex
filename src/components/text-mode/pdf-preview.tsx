export const PdfPreviewer = ({compiled, pdfURL}:{compiled: string, pdfURL: string}) => {
  return (
    <div className="rounded-md border bg-muted">
      {compiled=="finished" && (
        <object
          data={pdfURL}
          type="application/pdf"
          width="100%"
          height="100%"
        ></object>
      )}
    </div>
  );
};
