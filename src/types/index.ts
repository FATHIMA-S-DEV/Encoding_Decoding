export type EncodingType = 
  | 'base64'
  | 'url'
  | 'html'
  | 'jwt'
  | 'binary'
  | 'hex'
  | 'ascii'
  | 'decimal';

export type HashType = 
  | 'md5'
  | 'sha1'
  | 'sha256'
  | 'sha512';

export type Tool = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
};

export type ToolCategory = 
  | 'text'
  | 'binary'
  | 'hash'
  | 'image'
  | 'utility'
  | 'formatter'
  | 'converter'
  | 'generator';

export interface EncodingResult {
  original: string;
  encoded: string;
  type: EncodingType;
}

export interface DecodingResult {
  encoded: string;
  decoded: string;
  type: EncodingType;
}

export interface HashResult {
  input: string;
  output: string;
  type: HashType;
}