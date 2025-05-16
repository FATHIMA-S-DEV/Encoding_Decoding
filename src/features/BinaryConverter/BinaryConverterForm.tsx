import React, { useState, useEffect } from 'react';
import { Clipboard, RefreshCw } from 'lucide-react';
import CopyButton from '../../components/CopyButton';
import { readFromClipboard } from '../../utils/clipboard';

// Conversion utility functions
const textToBinary = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

const binaryToText = (binary: string): string => {
  return binary
    .split(' ')
    .map(bin => String.fromCharCode(parseInt(bin, 2)))
    .join('');
};

const textToHex = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
};

const hexToText = (hex: string): string => {
  return hex
    .split(' ')
    .map(h => String.fromCharCode(parseInt(h, 16)))
    .join('');
};

const textToAscii = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString())
    .join(' ');
};

const asciiToText = (ascii: string): string => {
  return ascii
    .split(' ')
    .map(code => String.fromCharCode(parseInt(code, 10)))
    .join('');
};

// New decimal conversion functions
const textToDecimal = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(10))
    .join(' ');
};

const decimalToText = (decimal: string): string => {
  return decimal
    .split(' ')
    .map(dec => String.fromCharCode(parseInt(dec, 10)))
    .join('');
};

interface BinaryConverterFormProps {
  converterId: string;
}

const BinaryConverterForm: React.FC<BinaryConverterFormProps> = ({ converterId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [conversionDirection, setConversionDirection] = useState<'encode' | 'decode'>('encode');

  // Get converter configuration based on the converterId
  const getConverterConfig = () => {
    switch (converterId) {
      case 'binary':
        return {
          title: 'Text to Binary Converter',
          encode: {
            label: 'Text to Binary',
            function: textToBinary,
            inputPlaceholder: 'Enter text to convert to binary...'
          },
          decode: {
            label: 'Binary to Text',
            function: binaryToText,
            inputPlaceholder: 'Enter binary to convert to text (space-separated bytes)...'
          }
        };
      case 'hex':
        return {
          title: 'Hexadecimal Converter',
          encode: {
            label: 'Text to Hex',
            function: textToHex,
            inputPlaceholder: 'Enter text to convert to hexadecimal...'
          },
          decode: {
            label: 'Hex to Text',
            function: hexToText,
            inputPlaceholder: 'Enter hexadecimal to convert to text (space-separated bytes)...'
          }
        };
      case 'ascii':
        return {
          title: 'ASCII Converter',
          encode: {
            label: 'Text to ASCII',
            function: textToAscii,
            inputPlaceholder: 'Enter text to convert to ASCII codes...'
          },
          decode: {
            label: 'ASCII to Text',
            function: asciiToText,
            inputPlaceholder: 'Enter ASCII codes to convert to text (space-separated)...'
          }
        };
      case 'decimal':
        return {
          title: 'Decimal Converter',
          encode: {
            label: 'Text to Decimal',
            function: textToDecimal,
            inputPlaceholder: 'Enter text to convert to decimal values...'
          },
          decode: {
            label: 'Decimal to Text',
            function: decimalToText,
            inputPlaceholder: 'Enter decimal values to convert to text (space-separated)...'
          }
        };
      default:
        return {
          title: 'Binary Converter',
          encode: {
            label: 'Encode',
            function: (str: string) => str,
            inputPlaceholder: 'Enter text...'
          },
          decode: {
            label: 'Decode',
            function: (str: string) => str,
            inputPlaceholder: 'Enter encoded text...'
          }
        };
    }
  };
  
  const config = getConverterConfig();
  
  // Convert input based on the selected direction
  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }
    
    try {
      const convertFunction = conversionDirection === 'encode' 
        ? config.encode.function
        : config.decode.function;
      
      setOutput(convertFunction(input));
    } catch (error) {
      setOutput('Error converting input');
    }
  }, [input, conversionDirection, converterId]);
  
  // Switch between encoding and decoding directions
  const toggleDirection = () => {
    setConversionDirection(prev => prev === 'encode' ? 'decode' : 'encode');
    setInput('');
    setOutput('');
  };
  
  // Reset the form
  const resetForm = () => {
    setInput('');
    setOutput('');
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
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{config.title}</h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setConversionDirection('encode')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              conversionDirection === 'encode'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {config.encode.label}
          </button>
          <button
            onClick={() => setConversionDirection('decode')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              conversionDirection === 'decode'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {config.decode.label}
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
            Input
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={conversionDirection === 'encode' 
              ? config.encode.inputPlaceholder 
              : config.decode.inputPlaceholder}
            rows={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm
                      focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="output" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            <CopyButton text={output} />
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
      </div>
    </div>
  );
};

export default BinaryConverterForm;