import resumecls from "@/constants/resumecls";

const latexCompiler = async (latexCode, engine) => {
  try {
    await engine.loadEngine();
  } catch (e) {
    e;
  }

  engine.writeMemFSFile("main.tex", latexCode);
  engine.writeMemFSFile("resume.cls", resumecls);
  engine.setEngineMainFile("main.tex");
  let PdftexCompilation = await engine.compileLaTeX();
  // console.log(PdftexCompilation.log);

  if (PdftexCompilation.status === 0) {
    const pdfBlob = new Blob([PdftexCompilation.pdf], {
      type: "application/pdf",
    });
    const pdfurl = URL.createObjectURL(pdfBlob);
    return pdfurl;
  } else {
    console.log("pdf error");
    return false;
  }
};

export default latexCompiler;
