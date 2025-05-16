import React, { useState, useEffect } from 'react';
import { Clipboard, RefreshCw } from 'lucide-react';
import CopyButton from '../../components/CopyButton';
import { generateMD5, generateSHA1, generateSHA256, generateSHA512 } from '../../utils/hash';
import { readFromClipboard } from '../../utils/clipboard';
import { HashType } from '../../types';

interface HashGeneratorFormProps {
  hashType: HashType;
}

const HashGeneratorForm: React.FC<HashGeneratorFormProps> = ({ hashType }) => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Get hash generator configuration
  const getHashConfig = () => {
    switch (hashType) {
      case 'md5':
        return {
          title: 'MD5 Hash Generator',
          description: 'Generate MD5 hash from input text. MD5 is not secure for passwords or sensitive data.',
          function: generateMD5,
        };
      case 'sha1':
        return {
          title: 'SHA-1 Hash Generator',
          description: 'Generate SHA-1 hash from input text. SHA-1 is no longer considered secure for cryptographic purposes.',
          function: generateSHA1,
        };
      case 'sha256':
        return {
          title: 'SHA-256 Hash Generator',
          description: 'Generate SHA-256 hash from input text.',
          function: generateSHA256,
        };
      case 'sha512':
        return {
          title: 'SHA-512 Hash Generator',
          description: 'Generate SHA-512 hash from input text.',
          function: generateSHA512,
        };
      default:
        return {
          title: 'Hash Generator',
          description: 'Generate hash from input text.',
          function: (str: string) => Promise.resolve(str),
        };
    }
  };

  const config = getHashConfig();

  // Generate hash when input changes
  useEffect(() => {
    const generateHash = async () => {
      if (!input) {
        setHash('');
        return;
      }

      setIsGenerating(true);
      try {
        const result = await config.function(input);
        setHash(result);
      } catch (error) {
        console.error('Hash generation error:', error);
        setHash('Error generating hash');
      } finally {
        setIsGenerating(false);
      }
    };

    // Use debounce to avoid generating hash on every keystroke
    const timerId = setTimeout(generateHash, 300);
    return () => clearTimeout(timerId);
  }, [input, hashType]);

  // Reset the form
  const resetForm = () => {
    setInput('');
    setHash('');
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
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {config.description}
        </p>
        <div className="flex items-center">
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
            Input Text
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to generate hash..."
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm
                      focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="hash" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {hashType.toUpperCase()} Hash
            </label>
            {hash && <CopyButton text={hash} />}
          </div>
          <div className="relative">
            <input
              id="hash"
              type="text"
              value={hash}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                        bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm
                        font-mono text-sm"
              placeholder={isGenerating ? "Generating hash..." : "Hash will appear here..."}
            />
            {isGenerating && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashGeneratorForm;