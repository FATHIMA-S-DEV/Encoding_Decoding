import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 
                transition-colors ${className}`}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={16} className="text-green-500" />
      ) : (
        <Copy size={16} className="text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};

export default CopyButton;