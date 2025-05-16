import React, { useState, useRef } from 'react';
import { File, RefreshCw, Upload } from 'lucide-react';
import CopyButton from '../../components/CopyButton';

const ImageToBase64Form: React.FC = () => {
  const [base64String, setBase64String] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileType, setFileType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous states
    setError('');
    setIsLoading(true);

    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size exceeds the 5MB limit.');
      setIsLoading(false);
      return;
    }

    // Read file as base64
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBase64String(result);
      setFileName(file.name);
      setFileSize(file.size);
      setFileType(file.type);
      setIsLoading(false);
    };

    reader.onerror = () => {
      setError('Error reading file.');
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setBase64String('');
    setFileName('');
    setFileSize(0);
    setFileType('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Image to Base64 Converter</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Convert an image to a Base64 encoded string. Maximum file size: 5MB.
        </p>
        <div className="flex items-center">
          <button
            onClick={resetForm}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors ml-auto"
            title="Reset"
          >
            <RefreshCw size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 
                      text-center hover:border-primary-400 dark:hover:border-primary-600 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
            ref={fileInputRef}
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload size={36} className="text-gray-400 dark:text-gray-500 mb-2" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Click to select or drop an image file
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              JPG, PNG, GIF, SVG, WEBP up to 5MB
            </span>
          </label>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Converting image...</span>
          </div>
        )}

        {base64String && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <File size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{fileName}</span>
                <span className="ml-auto text-gray-500 dark:text-gray-400 text-sm">
                  {formatFileSize(fileSize)}
                </span>
              </div>
              {fileType.startsWith('image/') && (
                <div className="flex justify-center mb-4">
                  <img
                    src={base64String}
                    alt="Converted image"
                    className="max-h-48 rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Base64 String
                </label>
                <CopyButton text={base64String} />
              </div>
              <textarea
                value={base64String}
                readOnly
                rows={6}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                          bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm
                          text-xs font-mono overflow-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToBase64Form;