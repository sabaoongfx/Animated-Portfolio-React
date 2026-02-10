import { ContactsDatabase } from './lib/database.js';

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to sanitize input
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, 1000); // Limit length
}

export default async function handler(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed' 
    });
  }

  try {
    const { name, email, phone, subject, message, source } = request.body;

    // Validate required fields
    if (!name || !email || !message) {
      return response.status(400).json({ 
        error: 'Missing required fields',
        message: 'Name, email, and message are required' 
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return response.status(400).json({ 
        error: 'Invalid email',
        message: 'Please provide a valid email address' 
      });
    }

    // Validate message length
    if (message.trim().length < 10) {
      return response.status(400).json({ 
        error: 'Message too short',
        message: 'Message must be at least 10 characters long' 
      });
    }

    if (message.length > 2000) {
      return response.status(400).json({ 
        error: 'Message too long',
        message: 'Message must be less than 2000 characters' 
      });
    }

    // Basic content filtering
    const badWords = ['spam', 'scam', 'viagra', 'casino', 'bitcoin'];
    const contentLower = message.toLowerCase();
    if (badWords.some(word => contentLower.includes(word))) {
      return response.status(400).json({ 
        error: 'Invalid content',
        message: 'Message contains inappropriate content' 
      });
    }

    // Sanitize inputs
    const contactData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase(),
      phone: phone ? sanitizeInput(phone) : null,
      subject: subject ? sanitizeInput(subject) : 'Contact Form Submission',
      message: sanitizeInput(message),
      source: source || 'animated-portfolio'
    };

    // Save to database
    const contactId = await ContactsDatabase.addContact(contactData);

    return response.status(201).json({ 
      success: true,
      contactId,
      message: 'Contact form submitted successfully! We will get back to you soon.' 
    });

  } catch {
    return response.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process contact form. Please try again later.' 
    });
  }
}
