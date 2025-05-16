/**
 * Copy text to clipboard
 * @param text Text to copy
 * @returns Promise that resolves when copying is done or rejects on error
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
    throw new Error('Failed to copy to clipboard');
  }
};

/**
 * Read text from clipboard
 * @returns Promise that resolves with clipboard text
 */
export const readFromClipboard = async (): Promise<string> => {
  try {
    return await navigator.clipboard.readText();
  } catch (err) {
    console.error('Failed to read from clipboard: ', err);
    throw new Error('Failed to read from clipboard. Make sure you\'ve granted permission.');
  }
};