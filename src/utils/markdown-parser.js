function markdownToLatex(text) {
    // Bold: **text** or __text__ -> \textbf{text}
    text = text.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}');
    text = text.replace(/__(.*?)__/g, '\\textbf{$1}');
    
    // Italic: *text* or _text_ -> \textit{text}
    text = text.replace(/\*(.*?)\*/g, '\\textit{$1}');
    text = text.replace(/_(.*?)_/g, '\\textit{$1}');
    
    // Inline Code: `code` -> \texttt{code}
    text = text.replace(/`([^`]+)`/g, '\\texttt{$1}');
    
    // Links: [text](url) -> \href{url}{text}
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '\\href{$2}{$1}');
    
    // Images: ![alt](url) -> \includegraphics{url}
    text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '\\includegraphics{$2}');
    
    return text;
}

 export default markdownToLatex;
