import { parse } from "yaml";
import Resume from "@/models/resume";
import { schemas } from "@/models/schemas";

const yamlParser = (content: string, setError: (error: (prev: string) => string) => void) => {
    setError(()=>"")
    let error = false;
    const resumeObject: {
      header: object;
      sections: { [key: string]: { type: string; content: [object] } };
    } = {
      header: {},
      sections: {},
    };
    const parsed = parse(content);

    //Header Section Parsing
    const headerResult = Resume.safeParse(parsed.resume);
    if (!headerResult.success) {
      const paths = headerResult.error.issues.map((issue)=>issue.path)
      if(parsed.resume == null || paths.length == 0 || Object.keys(parsed.resume).length == 0 || Object.keys(parsed.resume).length == 1){
        setError((prevContent: string) => 
          prevContent + 
          `>Type Error: Resume entry at \n${JSON.stringify(
            parsed.resume,
            null,
            2
          )} \n${headerResult.error.issues.map(
            (issue) => issue.path + " - " + issue.message
          )}          
          `,
        );
        return false;
      }
      else if(paths.every((path)=>path.includes("sections"))){
        setError((prevContent: string) => 
          prevContent + 
          `>Type Error: Sections entry at \n${JSON.stringify(
            parsed.resume.sections,
            null,
            2
          )} \n${headerResult.error.issues.map(
            (issue) => issue.path + " - " + issue.message
          )}
          
          `,
        );
        return false;
      }
      else {
        setError((prevContent: string) => 
          prevContent + 
          `>Type Error: Header entry at \n${JSON.stringify(
            parsed.resume.header,
            null,
            2
          )} \n${headerResult.error.issues.map(
            (issue) => issue.path + " - " + issue.message
          )}
          
          `,
        );
        return false;
      }
    } else {
      resumeObject.header = headerResult.data.header;
    }
  
    //Sections Parsing
    const sections = parsed.resume.sections;
    resumeObject.sections = JSON.parse(JSON.stringify(sections));
    const sectionKeys: string[] = Object.keys(sections);
    for (const i in sectionKeys) {
      if (Object.keys(schemas).includes(sections[sectionKeys[i]].type)) {
        for (const j in sections[sectionKeys[i]].content) {
          const result = schemas[sections[sectionKeys[i]].type].safeParse(
            sections[sectionKeys[i]].content[j]
          );
          if (result.success) {
            resumeObject.sections[sectionKeys[i]].content[j as unknown as number] = result.data;
            continue;
          } else {
            console.log("Error" + sections[sectionKeys[i]].type);
            setError((prevContent: string) => 
              prevContent +
              `>Type Error: ${
                sections[sectionKeys[i]].type
              } entry at \n${JSON.stringify(
                sections[sectionKeys[i]].content[j],
                null,
                2
              )} \n${result.error.issues.map(
                (issue) => issue.path + " - " + issue.message
              )}
              
`,
            );
            error = true;
          }
        }
      }
    }
    if (error == true) {
      return false;
    }
    console.log(resumeObject)
    return resumeObject;
  };

  export default yamlParser;