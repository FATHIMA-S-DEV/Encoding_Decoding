import React, { useState, useEffect } from 'react';
import { Clipboard, RefreshCw } from 'lucide-react';
import CopyButton from '../../components/CopyButton';
import { decodeJwt } from '../../utils/encoding';
import { readFromClipboard } from '../../utils/clipboard';

const JwtDecoderForm: React.FC = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setHeader('');
      setPayload('');
      setSignature('');
      setError('');
      return;
    }

    try {
      const decoded = decodeJwt(token);
      setHeader(JSON.stringify(decoded.header, null, 2));
      setPayload(JSON.stringify(decoded.payload, null, 2));
      setSignature(decoded.signature);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JWT token');
      setHeader('');
      setPayload('');
      setSignature('');
    }
  }, [token]);

  const resetForm = () => {
    setToken('');
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await readFromClipboard();
      setToken(clipboardText.trim());
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">JWT Decoder</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Decode and inspect JSON Web Tokens by pasting them below.
        </p>
        <div className="flex items-center mt-2">
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
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            JWT Token
          </label>
          <textarea
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value.trim())}
            placeholder="Paste your JWT token here..."
            rows={3}
            className={`w-full p-3 border rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-700
              ${error ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
          />
          {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>

        {(header || payload || signature) && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Header
                </label>
                {header && <CopyButton text={header} />}
              </div>
              <pre className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm overflow-x-auto">
                <code>{header}</code>
              </pre>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Payload
                </label>
                {payload && <CopyButton text={payload} />}
              </div>
              <pre className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm overflow-x-auto">
                <code>{payload}</code>
              </pre>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Signature (encoded)
                </label>
                {signature && <CopyButton text={signature} />}
              </div>
              <pre className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm overflow-x-auto">
                <code>{signature}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JwtDecoderForm;