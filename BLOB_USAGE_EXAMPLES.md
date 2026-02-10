# Vercel Blob Usage Examples

This document shows how to use the Vercel Blob storage functionality in your Animated Portfolio.

## 🎯 What You've Got

1. **Upload API** (`/api/upload`) - Handles file uploads with authentication
2. **FileUpload Component** - React component for easy file uploads  
3. **Blob Storage** - Files are stored on Vercel's edge network

## 📁 Use Cases

### 1. Contact Form with File Attachment
Add this to your contact form so visitors can attach their resume or portfolio:

```tsx
import FileUpload from './FileUpload';

// In your ContactUs component:
const [attachmentUrl, setAttachmentUrl] = useState('');

<FileUpload
  onUploadComplete={(url, filename) => {
    setAttachmentUrl(url);
    console.log('File uploaded:', url);
  }}
  uploadType="document"
  maxSize={5}
  accept=".pdf,.doc,.docx"
  label="Attach Resume/Portfolio (Optional)"
/>
```

### 2. Admin File Management
Add this to your admin panel for uploading images or documents:

```tsx
import FileUpload from './FileUpload';

// In your Admin component:
<FileUpload
  onUploadComplete={(url, filename) => {
    console.log('Admin file uploaded:', url);
    // Save to database or use for content
  }}
  uploadType="image"
  maxSize={10}
  accept="image/*"
  label="Upload Project Image"
  requireAuth={true}
  adminCredentials={{ email: adminEmail, secret: adminSecret }}
/>
```

### 3. Direct API Usage (Advanced)
You can also upload directly using the API:

```javascript
// Upload a file directly
const formData = new FormData();
formData.append('file', fileObject);
formData.append('type', 'image');

const response = await fetch('/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer admin@example.com:your-secret'
  },
  body: formData
});

const result = await response.json();
console.log('Uploaded file URL:', result.url);
```

## 🔧 API Endpoints

### POST `/api/upload`
Uploads a file to Vercel Blob storage.

**Parameters:**
- `file` - The file to upload (multipart form data)
- `type` - Upload type: `image`, `document`, or `general`
- `contactId` - (Optional) Link to a contact record

**Authentication:**
- Optional for public uploads
- Required for admin uploads (Bearer token)

**Response:**
```json
{
  "success": true,
  "url": "https://blob-url.vercel-storage.com/...",
  "filename": "2024-01-01-resume.pdf",
  "size": 1024000,
  "type": "application/pdf"
}
```

## 🗂️ File Organization

Files are automatically organized in folders:
- `public/image/` - Public image uploads
- `public/document/` - Public document uploads
- `admin/image/` - Admin image uploads
- `admin/document/` - Admin document uploads

## 🛡️ Security Features

1. **File Size Limits** - Max 10MB per file
2. **File Type Validation** - Only allowed file types
3. **Authentication** - Admin uploads require credentials
4. **Automatic Naming** - Prevents conflicts with timestamps

## 🚀 Setup in Vercel

Vercel Blob is automatically configured when you deploy. No additional setup needed!

## 💡 Pro Tips

1. **Link to Contacts** - Pass `contactId` to link files to specific contact submissions
2. **Database Storage** - Consider adding a `files` table to track uploaded files
3. **Image Optimization** - Use Vercel's Image Optimization for uploaded images
4. **Cleanup** - Implement periodic cleanup of unused files

## 📝 Next Steps

1. Add `FileUpload` component to your contact form
2. Set up admin credentials in Vercel dashboard
3. Test file uploads in both public and admin contexts
4. Consider extending the database to track file attachments
