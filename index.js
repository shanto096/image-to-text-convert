import { formatText } from "./utilities/formatter.js";
import { extractTextFromImage } from "./utilities/ocr.js";

export async function imageToText(buffer) {
    const rawText = await extractTextFromImage(buffer);
    const formatted = formatText(rawText);
    return formatted;
}