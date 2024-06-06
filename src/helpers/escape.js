/* eslint-disable no-useless-escape */



const escapeFunction = (code) => {
    const escapeCharacters = {
        "&": [/&/g, "\\&"],
        "%": [/%/g, "\\%"],
        "$": [/\$/g, "\\$"],
        "#": [/#/g, "\\#"],
        "{": [/{/g, "\\{"],
        "}": [/}/g, "\\}"],
        "~": [/~/g, "\\textasciitilde{}"],
        "^": [/\\^/g, "\\textasciicircum{}"],
        "<": [/</g, "\\textless{}"],
        ">": [/>/g, "\\textgreater{}"],
        "|": [/\|/g, "\\textbar{}"],
        "||": [/\|\|/g, "\\textbardbl{}"],
        "¶": [/¶/g, "\\P{}"],
        "¿": [/¿/g, "\\textquestiondown{}"],
        "‘": [/‘/g, "\\textquoteleft{}"],
        "’": [/’/g, "\\textquoteright{}"],
        "“": [/“/g, "\\textquotedblleft{}"],
        "”": [/”/g, "\\textquotedblright{}"],
      };
      for (let i in escapeCharacters){
        code = code.replace(escapeCharacters[i][0],escapeCharacters[i][1])
      }
    return code;
}

export default escapeFunction;