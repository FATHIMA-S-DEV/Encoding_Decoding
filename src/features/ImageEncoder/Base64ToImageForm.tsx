import React, { useState, useRef } from 'react';
import { Clipboard, Download, Image, RefreshCw } from 'lucide-react';
import { readFromClipboard } from '../../utils/clipboard';

const Base64ToImageForm: React.FC = () => {
  const [base64Input, setBase64Input] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBase64Input(e.target.value);
    tryConvertToImage(e.target.value);
  };
  
  const tryConvertToImage = (input: string) => {
    setError('');
    
    if (!input) {
      setImageUrl('');
      return;
    }
    
    // If the input already looks like a data URL, use it directly
    if (input.startsWith('data:image/')) {
      setImageUrl(input);
      return;
    }
    
    // Otherwise, try to convert it to a proper data URL
    try {
      // Try to determine image type or default to PNG
      const guessedType = 'image/png';
      
      // Add the data URL prefix if not present
      const dataUrl = `data:${guessedType};base64,${input.replace(/^data:image\/[a-z]+;base64,/, '')}`;
      
      setImageUrl(dataUrl);
    } catch (err) {
      console.error('Error converting base64 to image:', err);
      setError('Invalid Base64 image data');
      setImageUrl('');
    }
  };
  
  const handlePaste = async () => {
    try {
      const clipboardText = await readFromClipboard();
      setBase64Input(clipboardText);
      tryConvertToImage(clipboardText);
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
    }
  };
  
  const resetForm = () => {
    setBase64Input('');
    setImageUrl('');
    setError('');
  };
  
  const handleDownload = () => {
    if (!imageUrl || !downloadLinkRef.current) return;
    
    // Generate a filename
    const fileExtension = imageUrl.split(';')[0].split('/')[1] || 'png';
    const fileName = `image-${Date.now()}.${fileExtension}`;
    
    downloadLinkRef.current.href = imageUrl;
    downloadLinkRef.current.download = fileName;
    downloadLinkRef.current.click();
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Base64 to Image Converter</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Convert a Base64 encoded string back to an image.
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
      
      <div className="space-y-6">
        <div>
          <label htmlFor="base64Input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Base64 Image Data
          </label>
          <textarea
            id="base64Input"
            value={base64Input}
            onChange={handleInputChange}
            placeholder="Paste the Base64 encoded image data here..."
            rows={6}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm
                      focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700
                      font-mono text-xs"
          />
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        
        {imageUrl && !error && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Image size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Converted Image</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-700 
                           dark:bg-primary-900/30 dark:hover:bg-primary-900/50 dark:text-primary-300
                           transition-colors flex items-center space-x-1"
                  title="Download image"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <a ref={downloadLinkRef} className="hidden"></a>
              </div>
              
              <div className="flex justify-center">
                <img
                  src={imageUrl}
                  alt="Converted from Base64"
                  className="max-w-full max-h-80 rounded-lg shadow-sm"
                  onError={() => setError('Failed to load image. The Base64 data might be invalid.')}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Base64ToImageForm;