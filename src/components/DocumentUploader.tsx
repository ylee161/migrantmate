import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle, AlertCircle, Upload, X, FileText } from 'lucide-react';
import { ragService } from '../services/ragService';
import { parsePDF } from '../services/pdfParser';
import { fileStorage } from '../services/fileStorage';

interface UploadedFile {
  name: string;
  size: number;
  chunks: number;
}

export function DocumentUploader() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [documentCount, setDocumentCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    initializeStorage();
  }, []);

  const initializeStorage = async () => {
    try {
      await fileStorage.init();
      await loadDocuments();
      await loadUploadedFiles();
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      setErrorMessage('Failed to initialize storage system');
      setStatus('error');
    }
  };

  const loadUploadedFiles = async () => {
    try {
      const stored = localStorage.getItem('uploadedFiles');
      if (stored) {
        setUploadedFiles(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading uploaded files list:', error);
    }
  };

  const saveUploadedFile = (file: UploadedFile) => {
    const updated = [...uploadedFiles, file];
    setUploadedFiles(updated);
    localStorage.setItem('uploadedFiles', JSON.stringify(updated));
  };

  const removeUploadedFile = async (fileName: string) => {
    try {
      // Remove from IndexedDB
      await fileStorage.deleteFile(fileName);
      
      // Update state and localStorage
      const updated = uploadedFiles.filter(f => f.name !== fileName);
      setUploadedFiles(updated);
      localStorage.setItem('uploadedFiles', JSON.stringify(updated));
      
      console.log(`✅ Removed ${fileName}`);
    } catch (error) {
      console.error(`Failed to remove ${fileName}:`, error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file');
      setStatus('error');
      return;
    }

    // Check file size (50MB limit for IndexedDB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setErrorMessage(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum size is 50MB`);
      setStatus('error');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');
    setStatus('loading');

    try {
      console.log('📄 Starting file upload:', file.name, `(${(file.size / 1024 / 1024).toFixed(1)}MB)`);
      
      // Read file as ArrayBuffer
      console.log('📖 Reading file...');
      const arrayBuffer = await file.arrayBuffer();
      console.log('✅ File read successfully');

      // Parse PDF FIRST (before storing)
      console.log('🔍 Parsing PDF...');
      const chunks = await parsePDF(arrayBuffer, file.name);
      console.log(`✅ PDF parsed: ${chunks.length} chunks extracted`);

      if (chunks.length === 0) {
        throw new Error('No text content found in PDF');
      }

      // Store file in IndexedDB AFTER parsing
      // This ensures the ArrayBuffer is cloned fresh
      console.log('💾 Storing file in IndexedDB...');
      const fileArrayBuffer = await file.arrayBuffer();
      await fileStorage.storeFile(file.name, fileArrayBuffer);
      console.log('✅ File stored in IndexedDB');

      // Ingest into RAG
      console.log('🤖 Adding to RAG service...');
      await ragService.addDocuments(chunks);
      console.log('✅ Documents added to RAG service');

      // Update state
      saveUploadedFile({
        name: file.name,
        size: file.size,
        chunks: chunks.length
      });

      setDocumentCount(ragService.getDocumentCount());
      setStatus('success');
      
      console.log('🎉 Upload complete!');
      
      // Reset file input
      event.target.value = '';
    } catch (error) {
      console.error('❌ Upload error:', error);
      
      let userMessage = 'Failed to upload and process file';
      
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        userMessage = error.message;
      }
      
      setErrorMessage(userMessage);
      setStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const loadDocuments = async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      console.log('📚 Loading documents...');
      
      // Load from public/documents folder
      const pdfFiles = ['guide.pdf'];
      let totalChunks = 0;

      for (const filename of pdfFiles) {
        try {
          console.log(`📄 Loading ${filename}...`);
          const response = await fetch(`/documents/${filename}`);
          if (!response.ok) {
            console.warn(`⚠️ ${filename} not found, skipping`);
            continue;
          }

          const arrayBuffer = await response.arrayBuffer();
          const chunks = await parsePDF(arrayBuffer, filename);
          
          if (chunks.length > 0) {
            await ragService.addDocuments(chunks);
            totalChunks += chunks.length;
            console.log(`✅ ${filename}: ${chunks.length} chunks loaded`);
          }
        } catch (fileError) {
          console.warn(`⚠️ Error loading ${filename}:`, fileError);
        }
      }

      // Load uploaded files from IndexedDB
      const stored = localStorage.getItem('uploadedFiles');
      if (stored) {
        const files: UploadedFile[] = JSON.parse(stored);
        console.log(`📦 Loading ${files.length} uploaded files from IndexedDB...`);
        
        for (const fileInfo of files) {
          try {
            console.log(`📄 Loading ${fileInfo.name}...`);
            const arrayBuffer = await fileStorage.getFile(fileInfo.name);
            
            if (arrayBuffer) {
              const chunks = await parsePDF(arrayBuffer, fileInfo.name);
              await ragService.addDocuments(chunks);
              totalChunks += chunks.length;
              console.log(`✅ ${fileInfo.name}: ${chunks.length} chunks loaded`);
            } else {
              console.warn(`⚠️ ${fileInfo.name} not found in storage`);
            }
          } catch (error) {
            console.warn(`⚠️ Error loading uploaded file ${fileInfo.name}:`, error);
          }
        }
      }

      setDocumentCount(totalChunks);
      setStatus(totalChunks > 0 ? 'success' : 'idle');
      console.log(`✅ Total chunks loaded: ${totalChunks}`);
    } catch (error) {
      console.error('❌ Error loading documents:', error);
      setStatus('error');
      setErrorMessage('Failed to load documents');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border-2 border-cyan-600 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <BookOpen className="w-8 h-8 text-cyan-800" />
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Knowledge Base</h3>
          <p className="text-sm text-slate-600">Upload documents for AI assistance</p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <label className="block w-full">
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-dashed border-cyan-600 hover:border-cyan-800 transition-all cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
            <div className="text-center">
              <Upload className="w-12 h-12 text-cyan-800 mx-auto mb-3" />
              <p className="text-slate-800 font-bold mb-1">
                {isUploading ? 'Uploading...' : 'Upload PDF Document'}
              </p>
              <p className="text-sm text-slate-600">
                Click to select a PDF file to add to knowledge base
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Maximum file size: 50MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mb-6 space-y-2">
          <h4 className="font-bold text-slate-800 text-sm mb-2">Uploaded Documents:</h4>
          {uploadedFiles.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between bg-blue-50 border border-cyan-600 rounded-xl p-3"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{file.name}</p>
                  <p className="text-xs text-slate-600">
                    {(file.size / 1024 / 1024).toFixed(1)} MB • {file.chunks} chunks
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeUploadedFile(file.name)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Status Display */}
      <div className="bg-blue-50 rounded-2xl p-6 border-2 border-cyan-600">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">
              {isUploading ? 'Processing PDF...' : 'Loading documents...'}
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-slate-800 font-bold text-lg mb-2">
              {documentCount} document chunks loaded
            </p>
            <p className="text-slate-600 text-sm">
              RAG system is ready to answer questions
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-600 font-bold text-lg mb-2">Error</p>
            <p className="text-slate-600 text-sm mb-3">{errorMessage}</p>
            <p className="text-xs text-slate-500">Check browser console (F12) for details</p>
          </div>
        )}

        {status === 'idle' && (
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 font-medium mb-2">No documents loaded</p>
            <p className="text-slate-500 text-sm">
              Upload PDF files to get started
            </p>
          </div>
        )}
      </div>

      {status === 'success' && (
        <button
          onClick={loadDocuments}
          className="w-full mt-4 bg-cyan-800 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
        >
          Reload All Documents
        </button>
      )}
    </div>
  );
}
