import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Clipboard, RefreshCw } from 'lucide-react';
import CopyButton from '../../components/CopyButton';
import { readFromClipboard } from '../../utils/clipboard';

type StringOperation = 
  | 'trim'
  | 'trimStart'
  | 'trimEnd'
  | 'uppercase'
  | 'lowercase'
  | 'capitalize'
  | 'reverse'
  | 'count'
  | 'camelCase'
  | 'snakeCase'
  | 'kebabCase'
  | 'slugify';

const StringUtilsForm: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operation, setOperation] = useState<StringOperation>('trim');
  const [stats, setStats] = useState<{
    chars: number;
    words: number;
    lines: number;
    bytes: number;
  }>({ chars: 0, words: 0, lines: 0, bytes: 0 });
  
  // Process the input when it changes or the operation changes
  useEffect(() => {
    processString();
    calculateStats();
  }, [input, operation]);
  
  // Process the input string based on the selected operation
  const processString = () => {
    if (!input) {
      setOutput('');
      return;
    }
    
    try {
      switch (operation) {
        case 'trim':
          setOutput(input.trim());
          break;
        case 'trimStart':
          setOutput(input.trimStart());
          break;
        case 'trimEnd':
          setOutput(input.trimEnd());
          break;
        case 'uppercase':
          setOutput(input.toUpperCase());
          break;
        case 'lowercase':
          setOutput(input.toLowerCase());
          break;
        case 'capitalize':
          setOutput(
            input
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ')
          );
          break;
        case 'reverse':
          setOutput(input.split('').reverse().join(''));
          break;
        case 'count':
          // For count, we'll use the stats instead of setting output
          setOutput('');
          break;
        case 'camelCase':
          setOutput(
            input
              .toLowerCase()
              .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          );
          break;
        case 'snakeCase':
          setOutput(
            input
              .replace(/\s+/g, '_')
              .replace(/[^a-zA-Z0-9_]/g, '')
              .toLowerCase()
          );
          break;
        case 'kebabCase':
          setOutput(
            input
              .replace(/\s+/g, '-')
              .replace(/[^a-zA-Z0-9-]/g, '')
              .toLowerCase()
          );
          break;
        case 'slugify':
          setOutput(
            input
              .toLowerCase()
              .replace(/[^a-z0-9 -]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
          );
          break;
        default:
          setOutput(input);
      }
    } catch (error) {
      console.error('Error processing string:', error);
      setOutput('Error processing input');
    }
  };
  
  // Calculate text statistics
  const calculateStats = () => {
    const chars = input.length;
    const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
    const lines = input === '' ? 0 : input.split(/\r\n|\r|\n/).length;
    const bytes = new TextEncoder().encode(input).length;
    
    setStats({ chars, words, lines, bytes });
  };
  
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
  };
  
  // Swap input and output
  const swapInputOutput = () => {
    if (!output) return;
    setInput(output);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">String Utilities</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Perform various string operations like trimming, case conversion, and more.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <OperationButton operation="trim" currentOperation={operation} onClick={setOperation} label="Trim" />
          <OperationButton operation="uppercase" currentOperation={operation} onClick={setOperation} label="UPPERCASE" />
          <OperationButton operation="lowercase" currentOperation={operation} onClick={setOperation} label="lowercase" />
          <OperationButton operation="capitalize" currentOperation={operation} onClick={setOperation} label="Capitalize" />
          <OperationButton operation="reverse" currentOperation={operation} onClick={setOperation} label="Reverse" />
          <OperationButton operation="count" currentOperation={operation} onClick={setOperation} label="Count" />
          <OperationButton operation="camelCase" currentOperation={operation} onClick={setOperation} label="camelCase" />
          <OperationButton operation="snakeCase" currentOperation={operation} onClick={setOperation} label="snake_case" />
          <OperationButton operation="kebabCase" currentOperation={operation} onClick={setOperation} label="kebab-case" />
          <OperationButton operation="slugify" currentOperation={operation} onClick={setOperation} label="slugify" />
        </div>
        
        <div className="flex items-center mb-2">
          <div className="ml-auto flex space-x-2">
            <button 
              onClick={swapInputOutput}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              title="Swap input and output"
              disabled={!output}
            >
              <ArrowDownUp size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
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
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Input
            </label>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex space-x-2">
              <span>{stats.chars} chars</span>
              <span>{stats.words} words</span>
              <span>{stats.lines} lines</span>
              <span>{stats.bytes} bytes</span>
            </div>
          </div>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to process..."
            rows={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm
                      focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700"
          />
        </div>
        
        {operation !== 'count' && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Output
              </label>
              {output && <CopyButton text={output} />}
            </div>
            <textarea
              id="output"
              value={output}
              readOnly
              rows={6}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                        bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface OperationButtonProps {
  operation: StringOperation;
  currentOperation: StringOperation;
  onClick: (operation: StringOperation) => void;
  label: string;
}

const OperationButton: React.FC<OperationButtonProps> = ({ 
  operation, 
  currentOperation, 
  onClick, 
  label 
}) => {
  return (
    <button
      onClick={() => onClick(operation)}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        operation === currentOperation
          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
};

export default StringUtilsForm;