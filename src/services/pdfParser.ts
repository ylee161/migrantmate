import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Set worker source to CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export interface DocumentChunk {
  text: string;
  pageNumber: number;
  metadata: {
    filename: string;
    chunkIndex?: number;
  };
}

export class PDFParser {
  async extractText(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ 
      data: arrayBuffer,
      useSystemFonts: true
    }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  }
}

// Export standalone function for parsing PDF from ArrayBuffer
export async function parsePDF(arrayBuffer: ArrayBuffer, filename: string): Promise<DocumentChunk[]> {
  try {
    const pdf = await pdfjsLib.getDocument({ 
      data: arrayBuffer,
      useSystemFonts: true
    }).promise;
    const chunks: DocumentChunk[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      // Split page text into smaller chunks (roughly 500 characters each)
      const chunkSize = 500;
      const words = pageText.split(' ');
      let currentChunk = '';
      let chunkIndex = 0;

      for (const word of words) {
        if (currentChunk.length + word.length > chunkSize && currentChunk.length > 0) {
          chunks.push({
            text: currentChunk.trim(),
            pageNumber: i,
            metadata: {
              filename,
              chunkIndex: chunkIndex++
            }
          });
          currentChunk = word + ' ';
        } else {
          currentChunk += word + ' ';
        }
      }

      // Add remaining text as final chunk for this page
      if (currentChunk.trim().length > 0) {
        chunks.push({
          text: currentChunk.trim(),
          pageNumber: i,
          metadata: {
            filename,
            chunkIndex: chunkIndex++
          }
        });
      }
    }

    return chunks;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
}

// Export standalone function for backward compatibility with File objects
export async function processPDF(file: File): Promise<DocumentChunk[]> {
  const arrayBuffer = await file.arrayBuffer();
  return parsePDF(arrayBuffer, file.name);
}
