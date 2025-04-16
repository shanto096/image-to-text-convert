const fs = require('fs');
const imageToText = require('./src');

const imageBuffer = fs.readFileSync('IMG_20231202_012251.jpg');

imageToText(imageBuffer).then(text => {
    console.log('📄 Extracted Text:\n', text);
}).catch(err => {
    console.error('❌ Error:', err);
});