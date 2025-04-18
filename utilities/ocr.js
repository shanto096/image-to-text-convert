import Tesseract from 'tesseract.js';

export async function extractTextFromImage(buffer) {
    const result = await Tesseract.recognize(buffer, 'eng+ben', {
        logger: m => console.log(m.status, m.progress)
    });
    return result.data.text;
}