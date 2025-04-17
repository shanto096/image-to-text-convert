import { extractTextFromImage } from './ocr';
import { formatText } from './formatter';
import { OCROptions, OCRResult } from './types';

export async function imageToText(
    buffer: Buffer | string,
    options: OCROptions = {}
): Promise<OCRResult> {
    const ocrResult = await extractTextFromImage(buffer, options);
    
    const formattedText = formatText(ocrResult.text, options.formatOptions);
    return {
        ...ocrResult,
        text: formattedText
    };
}

export { OCROptions, OCRResult } from './types';
export { formatText } from './formatter'; 