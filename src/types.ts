export interface OCROptions {
    language?: string | string[];
    onProgress?: (progress: OCRProgress) => void;
    formatOptions?: TextFormatOptions;
}

export interface OCRProgress {
    status: string;
    progress: number;
}

export interface TextFormatOptions {
    trim?: boolean;
    removeExtraSpaces?: boolean;
    addParagraphs?: boolean;
    capitalizeFirstLetter?: boolean;
    preserveLineBreaks?: boolean;
}

export interface OCRResult {
    text: string;
    confidence: number;
    language: string;
} 