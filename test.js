const fs = require('fs');
const imageToText = require('./src');

const imageBuffer = fs.readFileSync('Minimalist Professional CV Resume.png');

imageToText(imageBuffer).then(text => {
    console.log('📄 Extracted Text:\n', text);
}).catch(err => {
    console.error('❌ Error:', err);
});

