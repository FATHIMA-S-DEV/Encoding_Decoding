import { Tool } from '../types';

export const tools: Tool[] = [
  // Text Encoding & Decoding
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode or decode text using Base64 encoding.',
    icon: 'FileText',
    category: 'text',
  },
  {
    id: 'url',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode text for use in URLs.',
    icon: 'Link',
    category: 'text',
  },
  {
    id: 'html',
    name: 'HTML Entities',
    description: 'Convert special characters to and from HTML entities.',
    icon: 'FileCode',
    category: 'text',
  },
  {
    id: 'jwt',
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens.',
    icon: 'Key',
    category: 'text',
  },
  
  // Binary Conversions
  {
    id: 'binary',
    name: 'Text to Binary',
    description: 'Convert text to binary representation and vice versa.',
    icon: 'Binary',
    category: 'binary',
  },
  {
    id: 'hex',
    name: 'Hex Converter',
    description: 'Convert between hexadecimal and other formats.',
    icon: 'Hash',
    category: 'binary',
  },
  {
    id: 'ascii',
    name: 'ASCII Converter',
    description: 'Convert text to ASCII codes and back.',
    icon: 'AlignJustify',
    category: 'binary',
  },
  {
    id: 'decimal',
    name: 'Decimal Converter',
    description: 'Convert decimal to other numbering systems.',
    icon: 'Table',
    category: 'binary',
  },

  // Hash Generators
  {
    id: 'md5',
    name: 'MD5 Generator',
    description: 'Generate MD5 hash from input text.',
    icon: 'Fingerprint',
    category: 'hash',
  },
  {
    id: 'sha1',
    name: 'SHA-1 Generator',
    description: 'Generate SHA-1 hash from input text.',
    icon: 'Shield',
    category: 'hash',
  },
  {
    id: 'sha256',
    name: 'SHA-256 Generator',
    description: 'Generate SHA-256 hash from input text.',
    icon: 'ShieldCheck',
    category: 'hash',
  },
  {
    id: 'sha512',
    name: 'SHA-512 Generator',
    description: 'Generate SHA-512 hash from input text.',
    icon: 'ShieldAlert',
    category: 'hash',
  },
  
  // Image Tools
  {
    id: 'image-to-base64',
    name: 'Image to Base64',
    description: 'Convert an image to Base64 encoded string.',
    icon: 'Image',
    category: 'image',
  },
  {
    id: 'base64-to-image',
    name: 'Base64 to Image',
    description: 'Convert Base64 encoded string back to an image.',
    icon: 'FileImage',
    category: 'image',
  },
  
  // String Utilities

  {
    id: 'string-utils',
    name: 'String Utilities',
    description: 'Trim, count words & characters, and other string operations.',
    icon: 'ScrollText',
    category: 'utility',
  },
  
  // Formatters
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data.',
    icon: 'Braces',
    category: 'formatter',
  },
  
  
  // Generators
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate random UUIDs/GUIDs.',
    icon: 'KeyRound',
    category: 'generator',
  },
];

export const getToolsByCategory = (category: string): Tool[] => {
  return tools.filter(tool => tool.category === category);
};

export const findToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const toolCategories = [
  { id: 'text', title: 'Text Encoding & Decoding' },
  { id: 'binary', title: 'Binary Conversions' },
  { id: 'hash', title: 'Hash Generators' },
  { id: 'image', title: 'Image Tools' },
  { id: 'utility', title: 'String Utilities' },
  { id: 'formatter', title: 'Formatters' },
  { id: 'generator', title: 'Generators' },
];