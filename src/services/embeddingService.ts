// Embedding service - disabled for production build
// This service requires @xenova/transformers which doesn't work in production builds

export class EmbeddingService {
  private static instance: EmbeddingService;

  private constructor() {
    console.warn('Embedding service is disabled in production builds');
  }

  static getInstance(): EmbeddingService {
    if (!EmbeddingService.instance) {
      EmbeddingService.instance = new EmbeddingService();
    }
    return EmbeddingService.instance;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    console.warn('Embedding generation is disabled');
    // Return a dummy embedding for compatibility
    return new Array(384).fill(0);
  }

  cosineSimilarity(a: number[], b: number[]): number {
    return 0;
  }
}

// Export standalone functions for backward compatibility
export async function generateEmbedding(text: string): Promise<number[]> {
  const service = EmbeddingService.getInstance();
  return service.generateEmbedding(text);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const service = EmbeddingService.getInstance();
  return service.cosineSimilarity(a, b);
}
