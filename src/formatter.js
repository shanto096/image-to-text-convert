function formatText(rawText) {
    return rawText
        .replace(/\s+/g, ' ')
        .replace(/([.!?])\s*/g, '$1\n')
        .trim();
}

module.exports = formatText;