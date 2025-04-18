# 📦 @shanto/image-to-text-convert

A powerful Node.js package to extract and beautify text from images using Tesseract.js. Supports both Bengali and English OCR with automatic text formatting.

## 📋 Features

- 🔍 Extract text from images (JPG, PNG, etc.)
- 🌏 Supports both English and Bengali text
- ✨ Automatic text formatting and cleanup
- 🔄 Promise-based API
- ⚡ Easy integration with Express, React, and Next.js
- 📱 Works with both file paths and buffers
- 📦 Pure ESM package (ES Modules)

## 🚀 Installation

```bash
npm install @shanto/image-to-text-convert
```

## ⚙️ Important: ES Modules

This package is pure ESM. It uses ES Modules exclusively. Make sure your project has either:

1. `"type": "module"` in your package.json, or
2. Use the `.mjs` extension for your files

```json
{
  "type": "module"
  // ... rest of your package.json
}
```

## 📘 Usage Guide

### Basic Usage (Node.js)

```javascript
// Using ES Modules (recommended)
import { imageToText } from '@shanto/image-to-text-convert';

// Example usage with async/await
async function extractText() {
  try {
    const text = await imageToText('your/image.jpg');
    console.log('Extracted text:', text);
  } catch (error) {
    console.error('Error:', error);
  }
}

extractText();
```

### Express.js Integration

1. First, set up your Express project and install dependencies:

```bash
npm install express multer @shanto/image-to-text-convert
```

2. Create your Express server (make sure to use .mjs extension or set "type": "module"):

```javascript
import express from 'express';
import multer from 'multer';
import { imageToText } from '@shanto/image-to-text-convert';
import { unlink } from 'fs/promises';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });

// Enable CORS if needed
app.use(cors());

// File upload endpoint
app.post('/api/extract-text', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const text = await imageToText(req.file.path);
    
    // Clean up: remove uploaded file
    await unlink(req.file.path);
    
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### React Integration

1. Set up your React project (e.g., using Vite or Create React App)
2. Install required packages:

```bash
npm install @shanto/image-to-text-convert axios
```

3. Create an image upload component:

```jsx
import { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:3000/api/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setText(data.text);
    } catch (error) {
      console.error('Error:', error.response?.data?.error || error.message);
      alert('Failed to extract text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
      {loading && <p>Processing image...</p>}
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
```

### Next.js Integration

1. Set up your Next.js project and install dependencies:

```bash
npm install next @shanto/image-to-text-convert uuid axios
```

2. Create an API route (`app/api/extract-text/route.js`):

```javascript
import { NextResponse } from 'next/server';
import { imageToText } from '@shanto/image-to-text-convert';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json(
        { error: 'No image uploaded' },
        { status: 400 }
      );
    }

    // Create temporary file
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempName = uuidv4() + path.extname(file.name);
    const tempPath = path.join(process.cwd(), 'uploads', tempName);

    // Save and process file
    await writeFile(tempPath, buffer);
    const text = await imageToText(tempPath);
    await unlink(tempPath);

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

3. Create a client component (`app/components/ImageUploader.js`):

```javascript
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ImageUploader() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const { data } = await axios.post('/api/extract-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setText(data.text);
    } catch (error) {
      console.error('Error:', error.response?.data?.error || error.message);
      alert('Failed to extract text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
      />
      {loading && <p>Processing image...</p>}
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
}
```

## 📁 Project Structure

Make sure to create the following directory structure:

```
📦 your-project/
├── 📁 uploads/           # For temporary file storage
├── 📁 node_modules/
├── package.json         # Must have "type": "module"
└── [your application files]
```

## ⚠️ Important Notes

1. Create an `uploads` directory in your project root
2. Ensure proper error handling in production
3. Implement file size limits and type validation
4. Consider implementing rate limiting for API routes
5. Clean up temporary files after processing
6. Make sure your project is configured for ES Modules
7. Configure Axios defaults and interceptors for better error handling

## 🔧 API Reference

### `imageToText(input)`

- `input`: Path to image file or buffer
- Returns: Promise<string>
- Supported image formats: JPG, PNG, BMP, etc.
- Supported languages: English (eng) and Bengali (ben)

## 👨‍💻 Author

[Shanto Kumar](https://github.com/shanto096)

## 📄 License

MIT