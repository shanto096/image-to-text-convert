import { imageToText } from '@shanto/image-to-text-convert';
import fs from 'fs';
const imageBuffer = fs.readFileSync('Minimalist Professional CV Resume.png');

imageToText(imageBuffer).then(text => {
    console.log('📄 Extracted Text:\n', text);
}).catch(err => {
    console.error('❌ Error:', err);
});