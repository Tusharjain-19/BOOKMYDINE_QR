import { createWorker } from 'tesseract.js';

export async function extractTextFromImageFile(
  file: File, 
  onProgress?: (progressPercent: number, statusText: string) => void
): Promise<string> {
  try {
    if (onProgress) onProgress(10, 'Reading image file data...');

    // Convert file to Data URL for browser & worker compatibility
    const imageDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });

    if (onProgress) onProgress(30, 'Initializing OCR engine...');
    const worker = await createWorker('eng');
    
    if (onProgress) onProgress(60, 'Scanning image and recognizing menu text...');
    const ret = await worker.recognize(imageDataUrl);
    
    if (onProgress) onProgress(90, 'Processing extracted menu items...');
    await worker.terminate();
    
    if (onProgress) onProgress(100, 'OCR Scan Complete!');

    return ret.data.text || '';
  } catch (error: any) {
    console.error('Image OCR error:', error);
    throw new Error(error.message || 'Failed to extract text from image. Please ensure image contains clear readable menu text.');
  }
}

export async function extractTextFromPdfFile(
  file: File,
  onProgress?: (progressPercent: number, statusText: string) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const textContent = reader.result as string;
        if (textContent && textContent.length > 50) {
          resolve(textContent);
        } else {
          const text = await extractTextFromImageFile(file, onProgress);
          resolve(text);
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read PDF file'));
    reader.readAsText(file);
  });
}
