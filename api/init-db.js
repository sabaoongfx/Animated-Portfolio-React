import { sql } from "@vercel/postgres";

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

  // Check authentication
  if (!authenticate(request)) {
    return response.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid admin credentials'
    });
  }

  try {
    // Check if database connection exists
    if (!process.env.POSTGRES_URL && !process.env.POSTGRES_URL_NON_POOLING) {
      return response.status(500).json({
        error: 'Database not configured',
        message: 'No database connection found. Please set up Vercel Postgres.',
        setup_instructions: [
          '1. Go to Vercel Dashboard → Storage → Create Database',
          '2. Choose Postgres',
          '3. Connect to your project',
          '4. Environment variables will be automatically added'
        ]
      });
    }

    // Test database connection
    await sql`SELECT NOW() as current_time`;

    // Create contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        is_read BOOLEAN DEFAULT false,
        source VARCHAR(100) DEFAULT 'portfolio'
      );
    `;

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_is_read ON contacts(is_read);
    `;

    // Check if table was created successfully
    const tableCheck = await sql`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'contacts' 
      ORDER BY ordinal_position;
    `;

    // Get current table stats
    const stats = await sql`
      SELECT 
        COUNT(*) as total_contacts,
        COUNT(CASE WHEN is_read = false THEN 1 END) as unread_contacts,
        MIN(created_at) as first_contact,
        MAX(created_at) as latest_contact
      FROM contacts;
    `;

    return response.status(200).json({
      success: true,
      message: 'Database initialized successfully!',
      database_info: {
        connection: 'OK',
        tables_created: ['contacts'],
        columns: tableCheck.rows,
        stats: stats.rows[0]
      },
      environment_check: {
        postgres_url: !!process.env.POSTGRES_URL,
        postgres_url_non_pooling: !!process.env.POSTGRES_URL_NON_POOLING,
        admin_email: !!process.env.ADMIN_EMAIL,
        admin_secret: !!process.env.ADMIN_SECRET
      }
    });

  } catch (error) {
    return response.status(500).json({
      error: 'Database initialization failed',
      message: error.message,
      details: {
        error_type: error.name,
        postgres_url_exists: !!process.env.POSTGRES_URL,
        postgres_url_non_pooling_exists: !!process.env.POSTGRES_URL_NON_POOLING
      },
      troubleshooting: [
        '1. Ensure Vercel Postgres is connected to your project',
        '2. Check that environment variables are set correctly',
        '3. Try redeploying after connecting database',
        '4. Check Vercel function logs for detailed errors'
      ]
    });
  }
}
