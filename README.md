# 📦 image-to-text-convert

Extract and beautify text from images using Tesseract.js. Supports multiple languages including English and Bengali. Now with TypeScript support!

---

## 🚀 Installation

```bash
npm install image-to-text-convert
```

## 🧠 Basic Usage

```typescript
import { imageToText } from 'image-to-text-convert';

// Using a file path
imageToText('./images/sample.jpg')
  .then(result => console.log(result.text))
  .catch(err => console.error(err));

// Using a buffer
const buffer = fs.readFileSync('./images/sample.jpg');
imageToText(buffer, {
  language: ['eng', 'ben'],
  formatOptions: {
    addParagraphs: true,
    capitalizeFirstLetter: true
  },
  onProgress: (progress) => {
    console.log(`Status: ${progress.status}, Progress: ${progress.progress * 100}%`);
  }
})
  .then(result => {
    console.log('Extracted Text:', result.text);
    console.log('Confidence:', result.confidence);
    console.log('Language:', result.language);
  })
  .catch(err => console.error(err));
```

## 🎯 Features

- ✨ TypeScript support with full type definitions
- 🌍 Multi-language support
- 📊 Progress tracking
- 🎨 Customizable text formatting
- 💪 Robust error handling
- 📝 Confidence scoring

## ⚙️ Options

```typescript
interface OCROptions {
    // Language(s) to use for OCR
    language?: string | string[];
    
    // Progress callback
    onProgress?: (progress: { status: string; progress: number }) => void;
    
    // Text formatting options
    formatOptions?: {
        trim?: boolean;              // Default: true
        removeExtraSpaces?: boolean; // Default: true
        addParagraphs?: boolean;     // Default: true
        capitalizeFirstLetter?: boolean; // Default: true
        preserveLineBreaks?: boolean;    // Default: false
    };
}
```

## 🌐 Express.js Integration

```typescript
import express from 'express';
import multer from 'multer';
import { imageToText } from 'image-to-text-convert';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await imageToText(req.file.path, {
      language: ['eng', 'ben'],
      onProgress: (progress) => console.log(`Progress: ${progress.progress * 100}%`)
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## ⚛️ React Integration

```typescript
import { useState } from 'react';

function App() {
  const [result, setResult] = useState<{ text: string; confidence: number }>();
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Convert</button>
      </form>
      {progress > 0 && <progress value={progress} max="100" />}
      {result && (
        <div>
          <h3>Extracted Text (Confidence: {result.confidence}%)</h3>
          <pre>{result.text}</pre>
        </div>
      )}
    </div>
  );
}
```

## 🧪 Running Tests

```bash
npm test
```

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🧑‍💻 Author

[shanto kumar](https://github.com/shanto096)

## 🪄 License

MIT
