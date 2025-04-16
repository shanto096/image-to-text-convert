const Tesseract = require('tesseract.js');

async function extractTextFromImage(buffer) {
    const result = await Tesseract.recognize(buffer, 'eng+ben', {
        logger: m => console.log(m.status, m.progress)
    });
    return result.data.text;
}

module.exports = extractTextFromImage;