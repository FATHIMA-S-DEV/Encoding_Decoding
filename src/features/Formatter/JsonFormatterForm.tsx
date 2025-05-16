import React, { useState, useEffect } from 'react';
import { Clipboard, RefreshCw } from 'lucide-react';
import CopyButton from '../../components/CopyButton';
import { readFromClipboard } from '../../utils/clipboard';

const JsonFormatterForm: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [error, setError] = useState('');
  
  // Format JSON when input or indent size changes
  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    
    try {
      // Parse the JSON to validate it
      const parsed = JSON.parse(input);
      
      // Format with the selected indent size
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError('');
    } catch (err) {
      console.error('JSON parsing error:', err);
      setError('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
      // Keep the output if there's an error
    }
  }, [input, indentSize]);
  
  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const clipboardText = await readFromClipboard();
      setInput(clipboardText);
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setInput('');
    setOutput('');
    setError('');
  };
  
  // Minify the JSON (remove all whitespace)
  const minifyJson = () => {
    if (!input) return;
    
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (err) {
      console.error('JSON minification error:', err);
      setError('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">JSON Formatter</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Format, validate, and beautify JSON data.
        </p>
        
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Indent Size:
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="rounded-md border border-gray-300 dark:border-gray-700 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                        focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700
                        text-sm py-1 px-2"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
          
          <button
            onClick={minifyJson}
            className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 
                     hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700
                     transition-colors"
          >
            Minify
          </button>
          
          <div className="ml-auto flex space-x-2">
            <button 
              onClick={resetForm}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              title="Reset"
            >
              <RefreshCw size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              onClick={handlePaste}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              title="Paste from clipboard"
            >
              <Clipboard size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Input JSON
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here..."
            rows={10}
            className={`w-full p-3 border rounded-lg shadow-sm font-mono text-sm
                      focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700
                      ${error 
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' 
                        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
          />
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Formatted JSON
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <pre
            id="output"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                     bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm
                     font-mono text-sm overflow-auto max-h-80"
          >
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatterForm;