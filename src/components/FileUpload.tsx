import { useState } from 'react';

interface FileUploadProps {
  onUploadComplete?: (url: string, filename: string) => void;
  uploadType?: 'image' | 'document' | 'general';
  maxSize?: number; // in MB
  accept?: string;
  label?: string;
  requireAuth?: boolean;
  adminCredentials?: { email: string; secret: string };
}

export default function FileUpload({
  onUploadComplete,
  uploadType = 'general',
  maxSize = 10,
  accept = 'image/*,application/pdf,.doc,.docx,.txt',
  label = 'Upload File',
  requireAuth = false,
  adminCredentials
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{url: string, filename: string} | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadProgress(`File too large. Maximum size is ${maxSize}MB.`);
      setTimeout(() => setUploadProgress(''), 3000);
      return;
    }

    setIsUploading(true);
    setUploadProgress('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', uploadType);

      const headers: HeadersInit = {};
      
      // Add authentication if required
      if (requireAuth && adminCredentials) {
        headers['Authorization'] = `Bearer ${adminCredentials.email}:${adminCredentials.secret}`;
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      
      setUploadedFile({
        url: result.url,
        filename: result.filename
      });
      
      setUploadProgress('Upload successful!');
      
      // Call callback if provided
      if (onUploadComplete) {
        onUploadComplete(result.url, result.filename);
      }

      setTimeout(() => setUploadProgress(''), 3000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setTimeout(() => setUploadProgress(''), 5000);
    } finally {
      setIsUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress('');
  };

  return (
    <div className="file-upload-component">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
        
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {isUploading ? 'Uploading...' : 'Choose File'}
            <input
              type="file"
              accept={accept}
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          <span className="text-xs text-gray-500">
            Max size: {maxSize}MB
          </span>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress && (
        <div className={`p-3 rounded-md text-sm mb-4 ${
          uploadProgress.includes('successful') 
            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
            : uploadProgress.includes('failed') || uploadProgress.includes('too large')
            ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
        }`}>
          {uploadProgress}
        </div>
      )}

      {/* Uploaded File Display */}
      {uploadedFile && (
        <div className="border border-gray-200 dark:border-gray-600 rounded-md p-3 bg-gray-50 dark:bg-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {uploadedFile.filename}
                </p>
                <a 
                  href={uploadedFile.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View file
                </a>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              title="Remove file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
