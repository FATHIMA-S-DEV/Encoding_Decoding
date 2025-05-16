/**
 * Generate MD5 hash of a string
 * Note: This is a placeholder. In a real implementation, you'd use a proper
 * crypto library. Browser's native SubtleCrypto API doesn't support MD5.
 */
/**
 * Generate MD5 hash of a string (pure JS implementation, no libraries)
 * Note: This is not as performant or secure as native or library implementations.
 */
export const generateMD5 = async (input: string): Promise<string> => {
  function md5cycle(x: number[], k: number[]) {
    let [a, b, c, d] = x;

    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + ((b & c) | (~b & d)) + x + t;
      return ((a << s) | (a >>> (32 - s))) + b;
    }

    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + ((b & d) | (c & ~d)) + x + t;
      return ((a << s) | (a >>> (32 - s))) + b;
    }

    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + (b ^ c ^ d) + x + t;
      return ((a << s) | (a >>> (32 - s))) + b;
    }

    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + (c ^ (b | ~d)) + x + t;
      return ((a << s) | (a >>> (32 - s))) + b;
    }

    // rounds
    a = ff(a, b, c, d, k[0], 7, -680876936);
    a = ff(a, b, c, d, k[1], 12, -389564586);
    a = ff(a, b, c, d, k[2], 17, 606105819);
    a = ff(a, b, c, d, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    a = ff(a, b, c, d, k[5], 12, 1200080426);
    a = ff(a, b, c, d, k[6], 17, -1473231341);
    a = ff(a, b, c, d, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    a = ff(a, b, c, d, k[9], 12, -1958414417);
    a = ff(a, b, c, d, k[10], 17, -42063);
    a = ff(a, b, c, d, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    a = ff(a, b, c, d, k[13], 12, -40341101);
    a = ff(a, b, c, d, k[14], 17, -1502002290);
    a = ff(a, b, c, d, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    a = gg(a, b, c, d, k[6], 9, -1069501632);
    a = gg(a, b, c, d, k[11], 14, 643717713);
    a = gg(a, b, c, d, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    a = gg(a, b, c, d, k[10], 9, 38016083);
    a = gg(a, b, c, d, k[15], 14, -660478335);
    a = gg(a, b, c, d, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    a = gg(a, b, c, d, k[14], 9, -1019803690);
    a = gg(a, b, c, d, k[3], 14, -187363961);
    a = gg(a, b, c, d, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    a = gg(a, b, c, d, k[2], 9, -51403784);
    a = gg(a, b, c, d, k[7], 14, 1735328473);
    a = gg(a, b, c, d, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    a = hh(a, b, c, d, k[8], 11, -2022574463);
    a = hh(a, b, c, d, k[11], 16, 1839030562);
    a = hh(a, b, c, d, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    a = hh(a, b, c, d, k[4], 11, 1272893353);
    a = hh(a, b, c, d, k[7], 16, -155497632);
    a = hh(a, b, c, d, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    a = hh(a, b, c, d, k[0], 11, -358537222);
    a = hh(a, b, c, d, k[3], 16, -722521979);
    a = hh(a, b, c, d, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    a = hh(a, b, c, d, k[12], 11, -421815835);
    a = hh(a, b, c, d, k[15], 16, 530742520);
    a = hh(a, b, c, d, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    a = ii(a, b, c, d, k[7], 10, 1126891415);
    a = ii(a, b, c, d, k[14], 15, -1416354905);
    a = ii(a, b, c, d, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    a = ii(a, b, c, d, k[3], 10, -1894986606);
    a = ii(a, b, c, d, k[10], 15, -1051523);
    a = ii(a, b, c, d, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    a = ii(a, b, c, d, k[15], 10, -30611744);
    a = ii(a, b, c, d, k[6], 15, -1560198380);
    a = ii(a, b, c, d, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    a = ii(a, b, c, d, k[11], 10, -1120210379);
    a = ii(a, b, c, d, k[2], 15, 718787259);
    a = ii(a, b, c, d, k[9], 21, -343485551);

    x[0] = (x[0] + a) | 0;
    x[1] = (x[1] + b) | 0;
    x[2] = (x[2] + c) | 0;
    x[3] = (x[3] + d) | 0;
  }

  function md5blk(s: string): number[] {
    const md5blks = [];
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] =
        s.charCodeAt(i) +
        (s.charCodeAt(i + 1) << 8) +
        (s.charCodeAt(i + 2) << 16) +
        (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }

  function md5(s: string): string {
    const n = s.length;
    const state = [1732584193, -271733879, -1732584194, 271733878];
    let i;

    for (i = 64; i <= n; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }

    s = s.substring(i - 64);
    const tail = Array(16).fill(0);
    for (i = 0; i < s.length; i++)
      tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
    tail[i >> 2] |= 0x80 << ((i % 4) << 3);

    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) tail[i] = 0;
    }

    tail[14] = n * 8;
    md5cycle(state, tail);

    return state
      .map((x) =>
        [x & 0xff, (x >> 8) & 0xff, (x >> 16) & 0xff, (x >> 24) & 0xff]
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
      )
      .join('');
  }

  return Promise.resolve(md5(input));
};

/**
 * Generate SHA-1 hash of a string
 */
export const generateSHA1 = async (input: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    
    // Convert buffer to hex string
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('SHA-1 generation error:', error);
    return 'Error generating SHA-1 hash';
  }
};

/**
 * Generate SHA-256 hash of a string
 */
export const generateSHA256 = async (input: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert buffer to hex string
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('SHA-256 generation error:', error);
    return 'Error generating SHA-256 hash';
  }
};

/**
 * Generate SHA-512 hash of a string
 */
export const generateSHA512 = async (input: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    
    // Convert buffer to hex string
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('SHA-512 generation error:', error);
    return 'Error generating SHA-512 hash';
  }
};