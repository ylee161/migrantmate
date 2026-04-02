/**
 * IndexedDB-based file storage service
 * Handles large PDF files that exceed localStorage limits
 */

const DB_NAME = 'MigrantMateDB';
const STORE_NAME = 'pdfFiles';
const DB_VERSION = 1;

interface StoredFile {
  name: string;
  data: ArrayBuffer;
  size: number;
  uploadedAt: number;
}

class FileStorageService {
  private db: IDBDatabase | null = null;

  /**
   * Initialize IndexedDB
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'name' });
        }
      };
    });
  }

  /**
   * Store a PDF file
   * Creates a new ArrayBuffer copy to prevent detachment issues
   */
  async storeFile(name: string, data: ArrayBuffer): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      try {
        // Clone the ArrayBuffer to prevent detachment issues
        const clonedData = data.slice(0);
        
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const file: StoredFile = {
          name,
          data: clonedData,
          size: clonedData.byteLength,
          uploadedAt: Date.now()
        };

        const request = store.put(file);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Retrieve a PDF file
   */
  async getFile(name: string): Promise<ArrayBuffer | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(name);

      request.onsuccess = () => {
        const result = request.result as StoredFile | undefined;
        resolve(result ? result.data : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Delete a PDF file
   */
  async deleteFile(name: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(name);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get all stored file names
   */
  async getAllFileNames(): Promise<string[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAllKeys();

      request.onsuccess = () => resolve(request.result as string[]);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Get file info without loading the full data
   */
  async getFileInfo(name: string): Promise<{ name: string; size: number; uploadedAt: number } | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(name);

      request.onsuccess = () => {
        const result = request.result as StoredFile | undefined;
        if (result) {
          resolve({
            name: result.name,
            size: result.size,
            uploadedAt: result.uploadedAt
          });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const fileStorage = new FileStorageService();
