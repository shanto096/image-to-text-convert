@@ -0,0 +1,176 @@
 # 📦 image-to-text-convert
 
 Extract and beautify text from images using Tesseract.js. Supports Bengali and English OCR.
 
 ---
 
 ## 🚀 Installation
 
 ```bash
 npm install image-to-text-convert
 ```
 
 
 
 ## 🧠 Basic Usage (Node.js)
 
 ```js
 const { imageToText } = require('image-to-text-convert');
 
 imageToText('./images/sample.jpg')
   .then(text => console.log(text))
   .catch(err => console.error(err));
 ```
 
 ---
 
 ## 🌐 Express.js Integration
 
 ### 🧩 Backend (Express API)
 
 ```js
 const express = require('express');
 const multer = require('multer');
 const path = require('path');
 const fs = require('fs');
 const { imageToText } = require('image-to-text-convert');
 
 const app = express();
 const upload = multer({ dest: 'uploads/' });
 
 app.post('/upload', upload.single('image'), async (req, res) => {
   try {
     const text = await imageToText(req.file.path);
     fs.unlinkSync(req.file.path);
     res.json({ text });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });
 
 app.listen(3000, () => console.log('Server running on port 3000'));
 ```
 
 ---
 
 ## ⚛️ React Integration Example
 
 ### 🖼️ Upload UI and Display Result
 
 ```jsx
 import { useState } from 'react';
 
 function App() {
   const [text, setText] = useState('');
   const [image, setImage] = useState(null);
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append('image', image);
 
     const res = await fetch(`http://localhost:3000/upload`, {
       method: 'POST',
       body: formData,
     });
     const data = await res.json();
     setText(data.text);
   };
 
   return (
     <div>
       <form onSubmit={handleSubmit}>
         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
         <button type="submit">Convert</button>
       </form>
       <pre>{text}</pre>
     </div>
   );
 }
 
 export default App;
 ```
 
 ---
 
 ## 🔁 Next.js Example (App Router)
 
 ### 📤 Create API Route: `/app/api/ocr/route.js`
 
 ```js
 // app/api/ocr/route.js
 import { NextResponse } from 'next/server';
 import { imageToText } from 'image-to-text-convert';
 import { writeFile, unlink } from 'fs/promises';
 import path from 'path';
 import { v4 as uuidv4 } from 'uuid';
 
 export async function POST(req) {
   try {
     const formData = await req.formData();
     const file = formData.get('image');
 
     if (!file) {
       return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
     }
 
     const buffer = Buffer.from(await file.arrayBuffer());
     const tempName = uuidv4() + path.extname(file.name);
     const tempPath = path.join('uploads', tempName);
     await writeFile(tempPath, buffer);
 
     const text = await imageToText(tempPath);
     await unlink(tempPath);
 
     return NextResponse.json({ text });
   } catch (error) {
     return NextResponse.json({ error: error.message }, { status: 500 });
   }
 }
 ```
 
 ✅ Add the `uploads/` folder in your project root to temporarily store files.
 
 📦 Install required package:
 ```bash
 npm install uuid
 ```
 
 ---
 
 ## 🗂️ Folder Structure (Recommended)
 
 ```
 📦 project-root/
 ├
 ├── 📁 uploads/
 ├── 📁 src/
 │   └── index.js
 ├── package.json
 ├── README.md
 ```
 
 ---
 
 ## 🧑‍💻 Author
 
 [shanto kumar](https://github.com/shanto096)
 
 ---
 
 ## 🪄 License
 
 MIT