const extractTextFromImage = require('./ocr');
const formatText = require('./formatter');

async function imageToText(buffer) {
    const rawText = await extractTextFromImage(buffer);
    const formatted = formatText(rawText);
    return formatted;
}

module.exports = imageToText;