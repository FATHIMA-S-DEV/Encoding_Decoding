/**
 * Encodes a string to Base64
 */
export const encodeBase64 = (str: string): string => {
  try {
    return window.btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    console.error('Base64 encoding error:', e);
    return 'Error: Invalid input for Base64 encoding';
  }
};

/**
 * Decodes a Base64 string
 */
export const decodeBase64 = (str: string): string => {
  try {
    return decodeURIComponent(escape(window.atob(str)));
  } catch (e) {
    console.error('Base64 decoding error:', e);
    return 'Error: Invalid Base64 input';
  }
};

/**
 * Encodes a string for URL usage
 */
export const encodeUrl = (str: string): string => {
  try {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+');
  } catch (e) {
    console.error('URL encoding error:', e);
    return 'Error: Invalid input for URL encoding';
  }
};

/**
 * Decodes a URL encoded string
 */
export const decodeUrl = (str: string): string => {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (e) {
    console.error('URL decoding error:', e);
    return 'Error: Invalid URL encoded input';
  }
};

/**
 * Encodes HTML entities
 */
export const encodeHtml = (str: string): string => {
  const entities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return str.replace(/[&<>"'`=\/]/g, char => entities[char]);
};

/**
 * Decodes HTML entities
 */
export const decodeHtml = (str: string): string => {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return doc.documentElement.textContent || '';
};

/**
 * Decodes a JWT token and returns its parts
 */
export const decodeJwt = (token: string): { header: any; payload: any; signature: string } => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid JWT format');
    
    const header = JSON.parse(decodeBase64(parts[0]));
    const payload = JSON.parse(decodeBase64(parts[1]));
    
    return {
      header,
      payload,
      signature: parts[2]
    };
  } catch (e) {
    console.error('JWT decoding error:', e);
    throw new Error('Invalid JWT token');
  }
};

/**
 * Converts text to binary
 */
export const textToBinary = (str: string): string => {
  return Array.from(str)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

/**
 * Converts binary to text
 */
export const binaryToText = (binary: string): string => {
  try {
    const binaries = binary.trim().split(/\s+/);
    return binaries
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join('');
  } catch (e) {
    console.error('Binary conversion error:', e);
    return 'Error: Invalid binary input';
  }
};

/**
 * Converts text to hex
 */
export const textToHex = (str: string): string => {
  return Array.from(str)
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
};

/**
 * Converts hex to text
 */
export const hexToText = (hex: string): string => {
  try {
    const hexes = hex.trim().split(/\s+/);
    return hexes
      .map(h => String.fromCharCode(parseInt(h, 16)))
      .join('');
  } catch (e) {
    console.error('Hex conversion error:', e);
    return 'Error: Invalid hexadecimal input';
  }
};

/**
 * Converts text to ASCII codes
 */
export const textToAscii = (str: string): string => {
  return Array.from(str)
    .map(char => char.charCodeAt(0))
    .join(' ');
};

/**
 * Converts ASCII codes to text
 */
export const asciiToText = (ascii: string): string => {
  try {
    const codes = ascii.trim().split(/\s+/).map(Number);
    return codes
      .map(code => String.fromCharCode(code))
      .join('');
  } catch (e) {
    console.error('ASCII conversion error:', e);
    return 'Error: Invalid ASCII input';
  }
};