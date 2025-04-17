import { createWorker } from 'tesseract.js';
import { OCROptions, OCRResult } from './types';

export async function extractTextFromImage(
    buffer: Buffer | string,
    options: OCROptions = {}
): Promise<OCRResult> {
    const {
        language = 'eng',
        onProgress
    } = options;

    if (!buffer) {
        throw new Error('No image data provided');
    }

    const worker = await createWorker({
        logger: m => {
            if (onProgress) {
                onProgress({
                    status: m.status,
                    progress: m.progress
                });
            }
        }
    });

    try {
        const langs = Array.isArray(language) ? language : [language];
        await worker.loadLanguage(langs.join('+'));
        await worker.initialize(langs.join('+'));

        const result = await worker.recognize(buffer);
        await worker.terminate();

        return {
            text: result.data.text,
            confidence: result.data.confidence,
            language: langs.join('+')
        };
    } catch (error) {
        await worker.terminate();
        throw new Error(`OCR processing failed: ${error.message}`);
    }
} 