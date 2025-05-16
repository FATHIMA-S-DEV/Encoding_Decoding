import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Clipboard, RefreshCw, Lock } from 'lucide-react';
import CopyButton from '../../components/CopyButton';
import { encodeBase64, decodeBase64, encodeUrl, decodeUrl, encodeHtml, decodeHtml } from '../../utils/encoding';
import { readFromClipboard } from '../../utils/clipboard';

// Custom function to encrypt text with a password
const encryptWithPassword = (text: string, password: string): string => {
  if (!password) return text; // No password provided, return text as is
  
  // Simple encryption: Use a specific format that's recognizable
  // In a real app, you would use a proper encryption algorithm
  const marker = "PASSWORDPROTECTED:";
  
  // Create a simple string that contains the marker, original text, and password
  // We double-encode to ensure the marker isn't accidentally found when decoding
  return encodeBase64(marker + encodeBase64(text) + ":" + encodeBase64(password));
};

// Custom function to decrypt text with a password
const decryptWithPassword = (encryptedText: string, password: string): string => {
  try {
    // First, decode the base64 string
    const decoded = decodeBase64(encryptedText);
    
    // Check if it has our password protection marker
    if (decoded.startsWith("PASSWORDPROTECTED:")) {
      // Extract the content part and password part
      const parts = decoded.substring("PASSWORDPROTECTED:".length).split(":");
      
      if (parts.length !== 2) {
        throw new Error("Invalid encrypted format");
      }
      
      const encodedContent = parts[0];
      const encodedStoredPassword = parts[1];
      
      // Decode the stored password
      const storedPassword = decodeBase64(encodedStoredPassword);
      
      // Check if provided password matches
      if (storedPassword === password) {
        // If correct, decode and return the content
        return decodeBase64(encodedContent);
      } else {
        throw new Error("Incorrect password");
      }
    }
    
    // If not our format, return the regular decoded text
    return decoded;
  } catch (error) {
    throw error;
  }
};

interface TextEncoderFormProps {
  encoderId: string;
}

// Define the encoder configuration type
interface EncoderConfig {
  title: string;
  encode: {
    label: string;
    function: (str: string) => string;
    inputPlaceholder: string;
  };
  decode: {
    label: string;
    function: (str: string) => string;
    inputPlaceholder: string;
  };
}

// Define the encoder configuration map type
interface EncoderConfigMap {
  [key: string]: EncoderConfig;
}

const TextEncoderForm: React.FC<TextEncoderFormProps> = ({ encoderId }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isEncoding, setIsEncoding] = useState(true);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [decodePassword, setDecodePassword] = useState('');
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [decodeError, setDecodeError] = useState('');
  
  // Get encoder configuration based on the encoderId
  const getEncoderConfig = (): EncoderConfig => {
    const baseConfig: EncoderConfigMap = {
      base64: {
        title: 'Base64 Encoder/Decoder',
        encode: {
          label: 'Encode to Base64',
          function: encodeBase64,
          inputPlaceholder: 'Enter text to encode to Base64...'
        },
        decode: {
          label: 'Decode from Base64',
          function: decodeBase64,
          inputPlaceholder: 'Enter Base64 string to decode...'
        }
      },
      url: {
        title: 'URL Encoder/Decoder',
        encode: {
          label: 'Encode for URL',
          function: encodeUrl,
          inputPlaceholder: 'Enter text to encode for URL...'
        },
        decode: {
          label: 'Decode from URL',
          function: decodeUrl,
          inputPlaceholder: 'Enter URL encoded string to decode...'
        }
      },
      html: {
        title: 'HTML Entities Encoder/Decoder',
        encode: {
          label: 'Encode HTML Entities',
          function: encodeHtml,
          inputPlaceholder: 'Enter text to convert to HTML entities...'
        },
        decode: {
          label: 'Decode HTML Entities',
          function: decodeHtml,
          inputPlaceholder: 'Enter HTML entities to decode...'
        }
      }
    };
    
    const defaultConfig: EncoderConfig = {
      title: 'Text Encoder/Decoder',
      encode: {
        label: 'Encode',
        function: (str: string): string => str,
        inputPlaceholder: 'Enter text...'
      },
      decode: {
        label: 'Decode',
        function: (str: string): string => str,
        inputPlaceholder: 'Enter encoded text...'
      }
    };
    
    return baseConfig[encoderId] || defaultConfig;
  };
  
  const config = getEncoderConfig();
  
  // Check if input appears to be password protected
  useEffect(() => {
    if (!isEncoding && input) {
      try {
        const decoded = decodeBase64(input);
        setIsPasswordRequired(decoded.startsWith("PASSWORDPROTECTED:"));
      } catch (error) {
        setIsPasswordRequired(false);
      }
    } else {
      setIsPasswordRequired(false);
    }
    setDecodeError('');
  }, [input, isEncoding]);
  
  // Convert input based on the selected direction
  useEffect(() => {
    if (!input) {
      setOutput('');
      setDecodeError('');
      return;
    }
    
    try {
      if (isEncoding) {
        // Handle encoding with optional password
        let result = config.encode.function(input);
        
        // Add password encryption if enabled
        if (usePassword && password) {
          result = encryptWithPassword(input, password);
        }
        
        setOutput(result);
        setDecodeError('');
      } else {
        // Handle decoding with password verification if needed
        if (isPasswordRequired && !decodePassword) {
          setOutput('');
          setDecodeError('This content is password protected. Please enter the password.');
          return;
        }
        
        try {
          let decoded;
          
          if (isPasswordRequired) {
            // Try to decrypt with provided password
            decoded = decryptWithPassword(input, decodePassword);
          } else {
            // Regular decoding without password
            decoded = config.decode.function(input);
          }
          
          setOutput(decoded);
          setDecodeError('');
        } catch (error) {
          setOutput('');
          setDecodeError(error.message || 'Error decoding input');
        }
      }
    } catch (error) {
      setOutput('');
      setDecodeError('Error processing input');
    }
  }, [input, isEncoding, encoderId, usePassword, password, decodePassword, isPasswordRequired]);
  
  // Toggle between encoding and decoding
  const toggleDirection = () => {
    setIsEncoding(!isEncoding);
    setInput(output);
    setOutput('');
    setDecodeError('');
  };
  
  // Reset the form
  const resetForm = () => {
    setInput('');
    setOutput('');
    setPassword('');
    setDecodePassword('');
    setDecodeError('');
  };
  
  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const clipboardText = await readFromClipboard();
      setInput(clipboardText);
    } catch (error: unknown) {
      console.error('Error pasting from clipboard:', error instanceof Error ? error.message : 'Unknown error');
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{config.title}</h2>
        <div className="flex items-center">
          <button
            onClick={() => setIsEncoding(true)}
            className={`flex items-center px-4 py-2 rounded-lg mr-2 transition-colors ${
              isEncoding 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {config.encode.label}
          </button>
          <button
            onClick={() => setIsEncoding(false)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              !isEncoding 
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {config.decode.label}
          </button>
          <div className="ml-auto flex space-x-2">
            <button 
              onClick={toggleDirection}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              title="Swap direction"
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
          <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Input
          </label>
          <div className="relative">
            <textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isEncoding ? config.encode.inputPlaceholder : config.decode.inputPlaceholder}
              rows={6}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm
                        focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700"
            />
            <div className="absolute bottom-2 right-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {input.length} characters
              </div>
            </div>
          </div>
        </div>
        
        {/* Password options section */}
        {isEncoding && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="usePassword"
                checked={usePassword}
                onChange={(e) => setUsePassword(e.target.checked)}
                className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4 mr-2"
              />
              <label htmlFor="usePassword" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Lock size={16} className="mr-1" /> Password protect this encoding
              </label>
            </div>
            
            {usePassword && (
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password for encryption"
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded 
                            bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                            focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  This password will be required to decode the content
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Password input for decoding if required */}
        {!isEncoding && isPasswordRequired && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-2">
              <Lock size={16} className="mr-2 text-amber-500" />
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                This content is password protected
              </div>
            </div>
            
            <div>
              <input
                type="password"
                value={decodePassword}
                onChange={(e) => setDecodePassword(e.target.value)}
                placeholder="Enter password to decode"
                className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:ring-primary-500 focus:border-primary-500"
              />
              
              {decodeError && (
                <p className="text-xs text-red-500 mt-1">
                  {decodeError}
                </p>
              )}
            </div>
          </div>
        )}
        
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
          
          {decodeError && !isPasswordRequired && (
            <p className="text-sm text-red-500 mt-1">
              {decodeError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextEncoderForm;