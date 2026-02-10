import { put } from "@vercel/blob";
import { ContactsDatabase } from './lib/database.js';

// Authentication using environment variables (no fallback for security)
const AUTH_EMAIL = process.env.ADMIN_EMAIL;
const AUTH_SECRET = process.env.ADMIN_SECRET;

function authenticate(request) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const credentials = authHeader.substring(7);
  const [email, secret] = credentials.split(':');
  
  return email === AUTH_EMAIL && secret === AUTH_SECRET;
}

export default async function handler(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  // Check authentication for admin uploads
  const isAdmin = authenticate(request);

  try {
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'general';
    const contactId = formData.get('contactId'); // Optional: link to a contact

    if (!file) {
      return response.status(400).json({
        error: 'No file provided',
        message: 'Please select a file to upload'
      });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return response.status(400).json({
        error: 'File too large',
        message: 'File size must be less than 10MB'
      });
    }

    // Validate file type based on upload type
    const allowedTypes = {
      'image': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      'document': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      'general': ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain']
    };

    const allowed = allowedTypes[type] || allowedTypes['general'];
    if (!allowed.includes(file.type)) {
      return response.status(400).json({
        error: 'Invalid file type',
        message: `Allowed types for ${type}: ${allowed.join(', ')}`
      });
    }

    // Generate filename
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `${timestamp}-${file.name}`;
    const folder = isAdmin ? 'admin' : 'public';
    const filePath = `${folder}/${type}/${filename}`;

    // Upload to Vercel Blob
    const blob = await put(filePath, file, {
      access: 'public',
      contentType: file.type,
    });


    return response.status(200).json({
      success: true,
      url: blob.url,
      filename: filename,
      size: file.size,
      type: file.type,
      message: 'File uploaded successfully'
    });

  } catch {
    return response.status(500).json({
      error: 'Upload failed',
      message: 'Failed to upload file. Please try again.'
    });
  }
}
