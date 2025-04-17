import { TextFormatOptions } from './types';

export function formatText(rawText: string, options: TextFormatOptions = {}): string {
    const {
        trim = true,
        removeExtraSpaces = true,
        addParagraphs = true,
        capitalizeFirstLetter = true,
        preserveLineBreaks = false
    } = options;

    let formattedText = rawText;

    if (trim) {
        formattedText = formattedText.trim();
    }

    if (removeExtraSpaces) {
        formattedText = formattedText.replace(/\s+/g, ' ');
    }

    if (!preserveLineBreaks) {
        formattedText = formattedText.replace(/\n+/g, ' ');
    }

    if (addParagraphs) {
        formattedText = formattedText
            .replace(/([.!?])\s+/g, '$1\n\n')
            .split('\n\n')
            .filter(para => para.trim().length > 0)
            .join('\n\n');
    }

    if (capitalizeFirstLetter) {
        formattedText = formattedText
            .split('\n\n')
            .map(para => para.charAt(0).toUpperCase() + para.slice(1))
            .join('\n\n');
    }

    return formattedText;
} 