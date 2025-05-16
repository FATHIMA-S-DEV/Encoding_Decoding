🔐 EncodePro - Advanced Encoding & Decoding Tools

![Screenshot (390)](https://github.com/user-attachments/assets/2e28a3d8-a0ef-43ca-aed9-73bc3825fc2c)


Overview
EncodePro is a comprehensive and advanced web application offering a variety of encoding and decoding tools for text, binary, images, and more. Perfect for developers, cybersecurity enthusiasts, and students learning about data encoding and encryption.

Live Demo

✨ Features
Text to Binary Conversion: Convert plain text to binary format
Binary to Text Conversion: Decode binary back to readable text
Text to Hexadecimal Conversion: Convert plain text to hexadecimal format
Hexadecimal to Text Conversion: Decode hexadecimal back to readable text
Hash Generation: Create various hash formats for input text
Image Encoding Support: Tools for working with image data
Clean, Responsive UI: Works seamlessly on desktop and mobile devices
Copy to Clipboard: Easily copy conversion results with a single click
Dark Mode Support: Eye-friendly interface with bg-gray-50/900 themes
🛠️ Technologies Used
Frontend Framework: TypeScript + Vite
UI Components: Custom components (Header.tsx, Footer.tsx)
Styling: Tailwind CSS (configured with tailwind.config.js)
Module Bundling: ESBuild
Development Tools:
ESLint for code quality
PostCSS for CSS processing
TypeScript for type safety
📋 How to Use
Visit the live demo
Enter your text in the input field
Select the desired conversion type from the options
Click the "Convert" button to see the result
Use the "Copy" button to copy the result to your clipboard
📋 Project Structure
project/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── clipboard.ts
│   │   ├── encoding.ts
│   │   ├── hash.ts
│   │   └── toolsData.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── main.tsx
├── public/
│   └── favicon.svg
├── index.html
├── index.css
├── App.tsx
├── vite.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── eslint.config.js
📦 Core Components
HashGeneratorForm.tsx: Handles generation of various hash formats
Header.tsx: Application header component
Footer.tsx: Application footer component
Utils:
encoding.ts: Core encoding/decoding logic
hash.ts: Hash generation utilities
clipboard.ts: Copy-to-clipboard functionality
toolsData.ts: Configuration for various tools
🖥️ Local Development
To run this project locally:

bash
# Clone this repository
git clone https://github.com/FATHIMA-S-DEV/Encoding_Decoding.git

# Navigate to the project directory
cd Encoding_Decoding

# Install dependencies
npm install

# Start the development server
npm run dev
🚀 Building for Production
bash
# Build for production
npm run build

# Preview the production build
npm run preview
🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📝 License
This project is MIT licensed.

👩‍💻 Author
Fathima S

GitHub: @FATHIMA-S-DEV
