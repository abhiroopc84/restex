import { sections } from "@/context/sections-provider";

const guidataHandler = (sections: sections) => {
    const resumeObject: {
        header: object;
        sections: { [key: string]: { type: string; content: [object] } };
      } = {
        header: {},
        sections: {},
      };

      resumeObject.header = sections[0].values[0];
      if(Object.keys(resumeObject.header).includes("social_networks") && resumeObject.header.social_networks.length===0){
        delete resumeObject.header.social_networks;
      }
      sections.slice(1,).forEach((section)=>{
        resumeObject.sections[section.name] = { type: section.type, content: section.values }
        if(section.type == "education" || section.type == "general" || section.type == "experience"){
          resumeObject.sections[section.name].content.forEach((valueObj,index)=>{
            if (Object.keys(valueObj).includes("highlights") && valueObj.highlights.length == 0){
              delete resumeObject.sections[section.name].content[index].highlights;
            }
          })
        }
      })

      return resumeObject;
}

export default guidataHandler