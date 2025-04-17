function formatText(rawText) {
    // Split into lines and remove empty lines at start/end
    let lines = rawText.split('\n').map(line => line.trim());

    // Remove consecutive empty lines
    lines = lines.filter((line, index, arr) => {
        if (line === '') {
            return arr[index - 1] !== '';
        }
        return true;
    });

    // Handle section headers (all caps or followed by colon)
    lines = lines.map((line, index) => {
        // Add extra spacing before section headers
        if (
            (line.toUpperCase() === line && line.length > 3) ||
            line.match(/^[A-Za-z\s]+:/)
        ) {
            return `\n${line}`;
        }
        return line;
    });

    // Join lines back together
    let formatted = lines.join('\n')
        // Clean up multiple spaces
        .replace(/\s+/g, ' ')
        // Preserve line breaks
        .replace(/\n\s+/g, '\n')
        // Clean up multiple newlines
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    return formatted;
}

module.exports = formatText;