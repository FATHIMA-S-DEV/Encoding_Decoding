import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import CopyButton from '../../components/CopyButton';

const UuidGeneratorForm: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [version, setVersion] = useState<string>('v4');
  const [format, setFormat] = useState<string>('default');
  
  // Generate UUIDs based on selected options
  const generateUuids = () => {
    const newUuids: string[] = [];
    
    for (let i = 0; i < count; i++) {
      let uuid = '';
      
      // Generate UUID v4 (random)
      if (version === 'v4') {
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      } else if (version === 'v1') {
        // For demo purposes, we'll generate a timestamp-based ID
        // Note: This is not a proper UUID v1 implementation
        const timestamp = new Date().getTime().toString(16);
        uuid = `${timestamp.padStart(8, '0')}-xxxx-1xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      
      // Apply formatting
      if (format === 'uppercase') {
        uuid = uuid.toUpperCase();
      } else if (format === 'nohyphen') {
        uuid = uuid.replace(/-/g, '');
      } else if (format === 'braces') {
        uuid = `{${uuid}}`;
      }
      
      newUuids.push(uuid);
    }
    
    setUuids(newUuids);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">UUID/GUID Generator</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Generate random UUIDs/GUIDs for use in your applications.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              UUID Version
            </label>
            <select
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                        focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700
                        py-2 px-3"
            >
              <option value="v4">UUID v4 (Random)</option>
              <option value="v1">UUID v1 (Time-based)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="format" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Format
            </label>
            <select
              id="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                        focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700
                        py-2 px-3"
            >
              <option value="default">Standard (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)</option>
              <option value="uppercase">Uppercase (XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX)</option>
              <option value="nohyphen">No Hyphens (xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)</option>
              <option value="braces">With Braces ({'{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}'})</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of UUIDs to Generate (1-100)
          </label>
          <input
            id="count"
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700
                      py-2 px-3"
          />
        </div>
        
        <button
          onClick={generateUuids}
          className="w-full py-2.5 px-4 rounded-md bg-primary-600 hover:bg-primary-700 
                   text-white font-medium transition-colors flex items-center justify-center"
        >
          <RefreshCw size={18} className="mr-2" />
          Generate UUIDs
        </button>
      </div>
      
      {uuids.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated UUIDs</h3>
            
            {uuids.length > 0 && (
              <CopyButton 
                text={uuids.join('\n')} 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
              />
            )}
          </div>
          
          <div className="p-6 max-h-80 overflow-y-auto">
            <ul className="space-y-2">
              {uuids.map((uuid, index) => (
                <li key={index} className="flex items-center justify-between">
                  <code className="text-sm font-mono text-gray-800 dark:text-gray-200">{uuid}</code>
                  <CopyButton text={uuid} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UuidGeneratorForm;