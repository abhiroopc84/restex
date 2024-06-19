const textEntry = (input) => {
    if(input.length>0){
        let textLatexCode = `{${input[0]}}`
        console.log(textLatexCode)
        input.slice(1,).forEach(e => {textLatexCode = textLatexCode + `
        \\\\{${e}}`})
        return textLatexCode;
    }
    else {
        return "";
    }
}

const educationEntry = (input) => {
    if(input.length>0){
        let educationLatexCode = `\\begin{itemize}
        `;
    input.forEach(e => { const keys = Object.keys(e);
        let highlights = ``
        const highlightsFormatter = (highlightsArray) => {
            highlightsArray.forEach(e => highlights = highlights + `\\item ${e}`);
            return highlights;
        }
        educationLatexCode = educationLatexCode + `
    \\item {\\bf ${e.institution}} \\hfill 
    {\\textit{${e.location}}}\\\\
    \\textit{${e.degree}} ${keys.includes("field")?`in \\textit{${e.field}}`:""} \\hfill
    {${e.start_date} ${keys.includes("end_date")?`- ${e.end_date}`:e.current?`- Present`:``}}
    ${keys.includes("GPA")||keys.includes("highlights")?
    `\\begin{itemize}
        \\itemsep -3pt {} ${keys.includes("GPA")?`\\item GPA: ${e.GPA}`:``}${keys.includes("highlights")?`${highlightsFormatter(e.highlights)}`:``}
    \\end{itemize}`:``}
    `});
    educationLatexCode = educationLatexCode + `
    \\end{itemize}`;
    return educationLatexCode;
    }
    else {
        return "";
    }
}

const onelineEntry = (input) => {
    if(input.length>0){
        let onelineLatexCode = `\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{6ex}} l }
        ${input[0].label} & ${input[0].details}`;
        input.slice(1,).forEach(e => {onelineLatexCode = onelineLatexCode + `\\\\
        ${e.label} & ${e.details}`});
        onelineLatexCode = onelineLatexCode + `
        \\end{tabular}`;
        return onelineLatexCode;
    }      
    else {
        return ""
    }
}

const experienceEntry = (input) => {
    if(input.length>0){
        let experienceLatexCode = `\\begin{itemize}
        `;
        input.forEach(e => {
            const keys = Object.keys(e);
            let highlights = ``;
            const highlightsFormatter = (highlightsArray) => {
                highlightsArray.forEach(e => highlights = highlights + `
                \\item ${e}`);
                return highlights;
            }
            experienceLatexCode = experienceLatexCode + `
            \\item \\textbf{${e.position}} \\hfill ${e.start_date} ${keys.includes("end_date")?`- ${e.end_date}`:e.current?`- Present`:``}\\\\
            ${e.company} \\hfill \\textit{${e.location}}
            ${keys.includes("highlights")?
            `\\begin{itemize}
                \\itemsep -3pt {} 
                ${keys.includes("highlights")?`${highlightsFormatter(e.highlights)}`:``}
             \\end{itemize}`:``}`
        });
        experienceLatexCode = experienceLatexCode + `
        \\end{itemize}`;
        return experienceLatexCode;
    }
    else {
        return "";
    }
}

const generalEntry = (input) => {
    if(input.length>0){
        let generalLatexCode = `\\begin{itemize}
        `;
        input.forEach(e=>{
            const keys = Object.keys(e);
            let highlights = ``;
            const highlightsFormatter = (highlightsArray) => {
                highlightsArray.forEach(e => highlights = highlights + `
                \\item ${e}`);
                return highlights;
            }
            generalLatexCode = generalLatexCode + `
            \\item \\textbf{${e.name}} \\hfill ${e.date}
            ${keys.includes("institution")||keys.includes("location")?`\\\\
            ${keys.includes("institution")?`${e.institution}`:``} \\hfill ${keys.includes("location")?`\\textit{${e.location}}`:``}`:``}
            ${keys.includes("highlights")?
            `\\begin{itemize}
                \\itemsep -3pt {} 
                ${keys.includes("highlights")?`${highlightsFormatter(e.highlights)}`:``}
             \\end{itemize}`:``}`
        });
        generalLatexCode = generalLatexCode + `
        \\end{itemize}`;
        return generalLatexCode;
    }
    else {
        return "";
    }
}

const publicationEntry = (input) => {
    if(input.length>0){
        let publicationLatexCode = `\\begin{itemize}
        `;
        input.forEach(e=>{
            let authors = ``;
            e.authors.slice(0,e.authors.length-1).forEach(author => {authors = authors + `${author}, `})
            authors = authors + `${e.authors[e.authors.length-1]}`
            publicationLatexCode = publicationLatexCode + `
            \\item \\vspace{3pt} \\textbf{${e.title}} \\hfill ${e.date}\\\\
            \\vspace{3pt}{${authors}}\\\\
            {${e.doi}}\\hfill
            {${e.journal}}`
        });
        publicationLatexCode = publicationLatexCode + `
        \\end{itemize}`
        return publicationLatexCode;
    }
    else {
        return "";
    }
}

const bulletEntry = (input) => {
    if(input.length>0){
        let bulletLatexCode = `\\begin{itemize}
        `
        input.forEach(e => {
            bulletLatexCode = bulletLatexCode + `
            \\item 	${e.bullet}`
        });
        bulletLatexCode = bulletLatexCode + `
        \\end{itemize}`;
        return bulletLatexCode;
    }
    else {
        return "";
    }
}

const codeFunctions = {
    text: textEntry,
    education: educationEntry,
    experience: experienceEntry,
    general: generalEntry,
    oneline: onelineEntry,
    publication: publicationEntry,
    bullet: bulletEntry,
}

const faangpath = (resumeObject) => {
    const header = resumeObject.header;
    const headerKeys = Object.keys(header);
    let social_networks = ``;
    const socialnetworksFormatter = (socialnetworksArray) => {
        social_networks = social_networks + `{${socialnetworksArray[0].network}: ${socialnetworksArray[0].username}} `
        if(socialnetworksArray.length>1){
            socialnetworksArray.slice(1,).forEach(e => {
                social_networks = social_networks + `\\\\ {${e.network}: ${e.username}} `
            })
        }
        return social_networks;
    }
    let latexCode = `\\documentclass{resume}

    \\usepackage[left=0.4 in,top=0.6in,right=0.4 in,bottom=0.8in]{geometry}
    \\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}} 
    \\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
    \\name{${header.name}}
    \\address{${headerKeys.includes("phone")?header.phone+" \\\\":""} ${header.location} \\\\ 
    \\href{mailto:${header.email}}{${header.email}}}
    ${headerKeys.includes("social_networks")||headerKeys.includes("website")?
        `\\address{${headerKeys.includes("social_networks")?`${socialnetworksFormatter(header.social_networks)}`:""}${headerKeys.includes("website")?`\\\\ {${header.website}}`:""}}`:""}
    
    \\usepackage{needspace}    
    \\usepackage{lastpage}
    \\usepackage{fancyhdr}
    \\usepackage{markdown}
    \\hypersetup{
        pdfauthor={${header.name}},
        pdftitle={${header.name}'s Resume},
    }
        
    \\input{glyphtounicode}
    \\pdfgentounicode=1

    \\pagestyle{plain}
    \\fancyhf{}

    \\begin{document}
    `
    const sections = resumeObject.sections;
    const sectionKeys = Object.keys(sections);
    for(let i in sectionKeys){
        latexCode = latexCode + `
        \\begin{rSection}{${sectionKeys[i]}}
        `;
        const codeFunction = codeFunctions[sections[sectionKeys[i]].type];
        latexCode = latexCode + `${codeFunction(sections[sectionKeys[i]].content)}`;
        latexCode = latexCode + `
        \\end{rSection}
        `
    }
    latexCode = latexCode + `
    \\end{document}
    `
    return latexCode;
}

export default faangpath;