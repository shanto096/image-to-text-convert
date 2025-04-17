import { formatText } from '../formatter';

describe('formatText', () => {
    it('should trim text by default', () => {
        const input = '  hello world  ';
        expect(formatText(input)).toBe('Hello world');
    });

    it('should handle multiple spaces', () => {
        const input = 'hello    world';
        expect(formatText(input)).toBe('Hello world');
    });

    it('should add paragraphs after sentences', () => {
        const input = 'First sentence. Second sentence! Third sentence?';
        expect(formatText(input)).toBe('First sentence.\n\nSecond sentence!\n\nThird sentence?');
    });

    it('should respect format options', () => {
        const input = '  hello    world.   another   sentence.  ';
        const options = {
            trim: false,
            removeExtraSpaces: false,
            addParagraphs: false,
            capitalizeFirstLetter: false
        };
        expect(formatText(input, options)).toBe('  hello    world.   another   sentence.  ');
    });

    it('should preserve line breaks when specified', () => {
        const input = 'Line 1\nLine 2\nLine 3';
        const options = { preserveLineBreaks: true };
        expect(formatText(input, options)).toBe('Line 1\nLine 2\nLine 3');
    });
}); 