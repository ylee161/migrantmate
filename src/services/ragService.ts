import { DocumentChunk } from './pdfParser';
import { generateEmbedding, cosineSimilarity } from './embeddingService';

export interface DocumentWithEmbedding {
  chunk: DocumentChunk;
  embedding: number[];
}

export interface RetrievalResult {
  chunk: DocumentChunk;
  similarity: number;
}

/**
 * RAG Service for document retrieval
 */
export class RAGService {
  private documents: DocumentWithEmbedding[] = [];
  private isReady: boolean = false;

  /**
   * Add documents to the knowledge base
   */
  async addDocuments(chunks: DocumentChunk[]): Promise<void> {
    console.log(`Processing ${chunks.length} document chunks...`);
    
    for (const chunk of chunks) {
      const embedding = await generateEmbedding(chunk.text);
      this.documents.push({ chunk, embedding });
    }
    
    this.isReady = true;
    console.log(`RAG service ready with ${this.documents.length} documents`);
  }

  /**
   * Retrieve relevant documents for a query
   */
  async retrieve(query: string, topK: number = 3): Promise<RetrievalResult[]> {
    if (!this.isReady || this.documents.length === 0) {
      console.warn('RAG service not ready or no documents loaded');
      return [];
    }

    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // Calculate similarities
    const results: RetrievalResult[] = this.documents.map(doc => ({
      chunk: doc.chunk,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding)
    }));

    // Sort by similarity and return top K
    results.sort((a, b) => b.similarity - a.similarity);
    return results.slice(0, topK);
  }

  /**
   * Get context string from retrieved documents
   */
  getContextString(results: RetrievalResult[]): string {
    if (results.length === 0) return '';

    return results
      .map((result, index) => {
        const { chunk, similarity } = result;
        return `[Document ${index + 1} - ${chunk.metadata.filename} (Page ${chunk.pageNumber}), Relevance: ${(similarity * 100).toFixed(1)}%]\n${chunk.text}`;
      })
      .join('\n\n---\n\n');
  }

  /**
   * Check if service is ready
   */
  isServiceReady(): boolean {
    return this.isReady;
  }

  /**
   * Get number of documents
   */
  getDocumentCount(): number {
    return this.documents.length;
  }

  /**
   * Clear all documents
   */
  clear(): void {
    this.documents = [];
    this.isReady = false;
  }
}

// Singleton instance
export const ragService = new RAGService();
