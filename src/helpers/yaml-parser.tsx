/* eslint-disable @typescript-eslint/no-explicit-any */
import BulletSchema from "@/models/bullet";
import EducationSchema from "@/models/education";
import ExperienceSchema from "@/models/experience";
import GeneralSchema from "@/models/general";
import OnelineSchema from "@/models/oneline";
import PublicationSchema from "@/models/publication";
import TextSchema from "@/models/text";
import { parse } from "yaml";
import { ZodType } from "zod";
import Resume from "@/models/resume";



const schemas: { [key: string]: ZodType<any, any, any> } = {
    text: TextSchema,
    education: EducationSchema,
    experience: ExperienceSchema,
    general: GeneralSchema,
    oneline: OnelineSchema,
    publication: PublicationSchema,
    bullet: BulletSchema,
  };

// eslint-disable-next-line @typescript-eslint/ban-types
const yamlParser = (content: string, setConsoleContent: Function) => {
    setConsoleContent([])
    let error = false;
    const resumeObject: {
      header: object;
      sections: { [key: string]: { type: string; content: [object] } };
    } = {
      header: {},
      sections: {},
    };
    const parsed = parse(content);

    //header parse
    const headerResult = Resume.safeParse(parsed.resume);
    if (!headerResult.success) {
      const paths = headerResult.error.issues.map((issue)=>issue.path)
      if(parsed.resume == null || paths.length == 0 || Object.keys(parsed.resume).length == 0 || Object.keys(parsed.resume).length == 1){
        setConsoleContent((prevContent: []) => [
          ...prevContent,
          `Type Error: Resume entry at \n${JSON.stringify(
            parsed.resume,
            null,
            2
          )} \n${headerResult.error.issues.map(
            (issue) => issue.path + " - " + issue.message
          )}`,
        ]);
        return false;
      }
      else if(paths.every((path)=>path.includes("sections"))){
        setConsoleContent((prevContent: []) => [
          ...prevContent,
          `Type Error: Sections entry at \n${JSON.stringify(
            parsed.resume.sections,
            null,
            2
          )} \n${headerResult.error.issues.map(
            (issue) => issue.path + " - " + issue.message
          )}`,
        ]);
        return false;
      }
      else {
        setConsoleContent((prevContent: []) => [
          ...prevContent,
          `Type Error: Header entry at \n${JSON.stringify(
            parsed.resume.header,
            null,
            2
          )} \n${headerResult.error.issues.map(
            (issue) => issue.path + " - " + issue.message
          )}`,
        ]);
        return false;
      }
    } else {
      resumeObject.header = headerResult.data.header;
    }
  
    //sections parse
    const sections = parsed.resume.sections;
    resumeObject.sections = JSON.parse(JSON.stringify(sections));
    // eslint-disable-next-line prefer-const
    const sectionKeys: string[] = Object.keys(sections);
    // eslint-disable-next-line prefer-const
    for (let i in sectionKeys) {
      if (Object.keys(schemas).includes(sections[sectionKeys[i]].type)) {
        // eslint-disable-next-line prefer-const
        for (let j in sections[sectionKeys[i]].content) {
          const result = schemas[sections[sectionKeys[i]].type].safeParse(
            sections[sectionKeys[i]].content[j]
          );
          if (result.success) {
            resumeObject.sections[sectionKeys[i]].content[j as unknown as number] = result.data;
            continue;
          } else {
            console.log("Error" + sections[sectionKeys[i]].type);
            setConsoleContent((prevContent: []) => [
              ...prevContent,
              `Type Error: ${
                sections[sectionKeys[i]].type
              } entry at \n${JSON.stringify(
                sections[sectionKeys[i]].content[j],
                null,
                2
              )} \n${result.error.issues.map(
                (issue) => issue.path + " - " + issue.message
              )}`,
            ]);
            error = true;
          }
        }
      }
    }
    if (error == true) {
      return false;
    }
    return resumeObject;
  };

  export default yamlParser;