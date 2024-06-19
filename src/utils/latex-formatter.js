export function formatLaTeX(latexCode) {
    // Split the input code into lines
    let lines = latexCode.split('\n');

    // Variables to manage the current indentation level
    let indentLevel = 0;
    const indentSpace = '  '; // Two spaces for each indentation level

    // Helper function to determine if the line starts with a closing brace
    function isClosingLine(line) {
        return line.startsWith('}') || line.startsWith('\\end{');
    }

    // Helper function to determine if the line ends with an opening brace
    function isOpeningLine(line) {
        return line.endsWith('{') || line.startsWith('\\begin{');
    }

    // Process each line
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Adjust indentation for closing braces or \end
        if (isClosingLine(line)) {
            indentLevel = Math.max(indentLevel - 1, 0);
        }

        // Apply indentation
        lines[i] = indentSpace.repeat(indentLevel) + line;

        // Adjust indentation for opening braces or \begin
        if (isOpeningLine(line)) {
            indentLevel++;
        }
    }

    // Join the lines back together
    return lines.join('\n');
}

