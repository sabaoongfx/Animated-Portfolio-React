import { ContactsDatabase } from '../lib/database.js';

// Authentication using environment variables (no fallback for security)
const AUTH_EMAIL = process.env.ADMIN_EMAIL;
const AUTH_SECRET = process.env.ADMIN_SECRET;

function authenticate(request) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const credentials = authHeader.substring(7); // Remove 'Bearer ' prefix
  const [email, secret] = credentials.split(':');
  
  return email === AUTH_EMAIL && secret === AUTH_SECRET;
}

export default async function handler(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // Check authentication
  if (!authenticate(request)) {
    return response.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid admin credentials'
    });
  }

  try {
    if (request.method === 'GET') {
      // Get all contacts
      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 50;
      const offset = (page - 1) * limit;
      
      const contacts = await ContactsDatabase.getContacts(limit, offset);
      const totalCount = await ContactsDatabase.getContactsCount();
      const unreadCount = await ContactsDatabase.getUnreadCount();
      
      return response.status(200).json({
        success: true,
        contacts,
        pagination: {
          page,
          limit,
          total: totalCount,
          pages: Math.ceil(totalCount / limit)
        },
        stats: {
          total: totalCount,
          unread: unreadCount
        }
      });
      
    } else if (request.method === 'POST') {
      // Handle contact actions (mark as read, delete)
      const { action, contactId } = request.body;
      
      if (!action || !contactId) {
        return response.status(400).json({
          error: 'Bad Request',
          message: 'Action and contactId are required'
        });
      }
      
      if (action === 'mark_read') {
        await ContactsDatabase.markAsRead(contactId);
        return response.status(200).json({
          success: true,
          message: 'Contact marked as read'
        });
        
      } else if (action === 'delete') {
        await ContactsDatabase.deleteContact(contactId);
        return response.status(200).json({
          success: true,
          message: 'Contact deleted successfully'
        });
        
      } else {
        return response.status(400).json({
          error: 'Bad Request',
          message: 'Invalid action. Supported actions: mark_read, delete'
        });
      }
      
    } else if (request.method === 'DELETE') {
      // Delete contact by ID from URL parameter
      const contactId = request.query.id;
      
      if (!contactId) {
        return response.status(400).json({
          error: 'Bad Request',
          message: 'Contact ID is required'
        });
      }
      
      await ContactsDatabase.deleteContact(parseInt(contactId));
      return response.status(200).json({
        success: true,
        message: 'Contact deleted successfully'
      });
      
    } else {
      return response.status(405).json({
        error: 'Method not allowed',
        message: 'Only GET, POST, and DELETE methods are supported'
      });
    }
    
  } catch {
    return response.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process request'
    });
  }
};
