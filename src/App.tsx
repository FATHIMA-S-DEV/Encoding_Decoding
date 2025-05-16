import React, { useState } from 'react';
import Layout from './components/Layout';
import ToolGrid from './components/ToolGrid';
import { getToolsByCategory, toolCategories } from './utils/toolsData';
import TextEncoderForm from './features/TextEncoder/TextEncoderForm';
import JwtDecoderForm from './features/TextEncoder/JwtDecoderForm';
import BinaryConverterForm from './features/BinaryConverter/BinaryConverterForm';
import HashGeneratorForm from './features/HashGenerator/HashGeneratorForm';
import ImageToBase64Form from './features/ImageEncoder/ImageToBase64Form';
import Base64ToImageForm from './features/ImageEncoder/Base64ToImageForm';
import StringUtilsForm from './features/Utility/StringUtilsForm';
import JsonFormatterForm from './features/Formatter/JsonFormatterForm';

import UuidGeneratorForm from './features/Generator/UuidGeneratorForm';

import { ThemeProvider } from './context/ThemeContext';
import { Tool } from './types';

function App() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  
  const handleSelectTool = (id: string) => {
    setSelectedTool(id);
    // Smooth scroll to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToTools = () => {
    setSelectedTool(null);
  };
  
  // Render the appropriate tool form based on selectedTool
  const renderToolForm = () => {
    switch (selectedTool) {
      // Text encoders
      case 'base64':
      case 'url':
      case 'html':
        return <TextEncoderForm encoderId={selectedTool} />;
      case 'jwt':
        return <JwtDecoderForm />;
      
      // Binary converters
      case 'binary':
      case 'hex':
      case 'ascii':
      case 'decimal':
        return <BinaryConverterForm converterId={selectedTool} />;
      
      // Hash generators
      case 'md5':
      case 'sha1':
      case 'sha256':
      case 'sha512':
        return <HashGeneratorForm hashType={selectedTool} />;
      
      // Image tools
      case 'image-to-base64':
        return <ImageToBase64Form />;
      case 'base64-to-image':
        return <Base64ToImageForm />;
      
      // String utilities
      case 'string-utils':
        return <StringUtilsForm />;
      
      // Formatters
      case 'json-formatter':
        return <JsonFormatterForm />;

      
      // Generators
      case 'uuid-generator':
        return <UuidGeneratorForm />;
      
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <Layout>
        <div className="container mx-auto px-4 py-6">
          {selectedTool ? (
            <>
              <button
                onClick={handleBackToTools}
                className="mb-6 flex items-center text-primary-600 hover:text-primary-700 
                         dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
              >
                ← Back to Tools
              </button>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-12">
                {renderToolForm()}
              </div>
            </>
          ) : (
            <>
              <section className="py-12 md:py-20 text-center">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Advanced Encoding & Decoding Tools
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    A comprehensive suite of utilities for developers and security professionals.
                    Encode, decode, hash, format, and more - all in one place.
                  </p>
                </div>
              </section>
              
              {toolCategories.map(category => (
                <ToolGrid
                  key={category.id}
                  title={category.title}
                  categoryId={category.id}
                  tools={getToolsByCategory(category.id) as Tool[]}
                  onSelectTool={handleSelectTool}
                />
              ))}
            </>
          )}
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;