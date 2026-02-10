import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'GET') {
    return response.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are allowed'
    });
  }

  try {
    const status = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      vercel_region: process.env.VERCEL_REGION || 'unknown',
      api_working: true
    };

    // Check environment variables (without revealing values)
    const envCheck = {
      postgres_url: !!process.env.POSTGRES_URL,
      postgres_url_non_pooling: !!process.env.POSTGRES_URL_NON_POOLING,
      admin_email: !!process.env.ADMIN_EMAIL,
      admin_secret: !!process.env.ADMIN_SECRET,
      database_url: !!process.env.DATABASE_URL,
      neon_database_url: !!process.env.DATABASE_URL
    };

    let databaseStatus = {
      connection: 'NOT_TESTED',
      error: null,
      tables_exist: false
    };

    // Test database connection
    try {
      if (process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING) {
        const connectionTest = await sql`SELECT NOW() as current_time, version() as postgres_version`;
        databaseStatus.connection = 'OK';
        databaseStatus.server_time = connectionTest.rows[0]?.current_time;
        databaseStatus.postgres_version = connectionTest.rows[0]?.postgres_version?.split(' ')[0] + ' ' + connectionTest.rows[0]?.postgres_version?.split(' ')[1];

        // Check if contacts table exists
        try {
          const tableCheck = await sql`
            SELECT COUNT(*) as table_count 
            FROM information_schema.tables 
            WHERE table_name = 'contacts'
          `;
          databaseStatus.tables_exist = parseInt(tableCheck.rows[0]?.table_count) > 0;
          
          if (databaseStatus.tables_exist) {
            const stats = await sql`SELECT COUNT(*) as total FROM contacts`;
            databaseStatus.contacts_count = parseInt(stats.rows[0]?.total);
          }
        } catch (tableError) {
          databaseStatus.tables_exist = false;
          databaseStatus.table_error = tableError.message;
        }

      } else {
        databaseStatus.connection = 'NO_DATABASE_URL';
        databaseStatus.error = 'No database connection string found';
      }
    } catch (dbError) {
      databaseStatus.connection = 'ERROR';
      databaseStatus.error = dbError.message;
    }

    return response.status(200).json({
      status: 'OK',
      ...status,
      environment_variables: envCheck,
      database: databaseStatus,
      recommendations: databaseStatus.connection !== 'OK' ? [
        'Add POSTGRES_URL to Vercel environment variables',
        'Ensure Vercel Postgres is connected to your project',
        'Try redeploying after adding environment variables'
      ] : databaseStatus.tables_exist ? [
        'Database is ready! Admin panel should work.'
      ] : [
        'Database connected but tables missing.',
        'Run POST /api/init-db to create tables.'
      ]
    });

  } catch (error) {
    console.error('Status check error:', error);
    return response.status(500).json({
      status: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
