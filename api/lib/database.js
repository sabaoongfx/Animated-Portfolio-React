import { sql } from "@vercel/postgres";

// Initialize database tables if they don't exist
async function initializeDatabase() {
  try {
    // Only initialize if we have database connection
    if (!process.env.POSTGRES_URL && !process.env.POSTGRES_URL_NON_POOLING) {
      return;
    }

    // Contacts table
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
    
  } catch {
    // Database initialization failed silently
  }
}

// Call initialization
if (process.env.NODE_ENV !== 'production') {
  initializeDatabase();
}

export class ContactsDatabase {
  // Get all contacts (for admin)
  static async getContacts(limit = 100, offset = 0) {
    const { rows } = await sql`
      SELECT * FROM contacts
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return rows;
  }
  
  // Add a new contact
  static async addContact(contact) {
    const { name, email, phone, subject, message, source = 'portfolio' } = contact;
    
    const result = await sql`
      INSERT INTO contacts (name, email, phone, subject, message, source)
      VALUES (${name}, ${email}, ${phone || null}, ${subject || 'Contact Form Submission'}, ${message}, ${source})
      RETURNING id;
    `;
    return result.rows[0].id;
  }
  
  // Get contact by ID
  static async getContactById(id) {
    const { rows } = await sql`
      SELECT * FROM contacts WHERE id = ${id}
    `;
    return rows.length > 0 ? rows[0] : null;
  }
  
  // Mark contact as read
  static async markAsRead(id) {
    await sql`
      UPDATE contacts SET is_read = true WHERE id = ${id}
    `;
  }
  
  // Delete contact
  static async deleteContact(id) {
    await sql`
      DELETE FROM contacts WHERE id = ${id}
    `;
  }
  
  // Get contacts count
  static async getContactsCount() {
    const { rows } = await sql`
      SELECT COUNT(*) as count FROM contacts
    `;
    return parseInt(rows[0].count, 10);
  }
  
  // Get unread contacts count
  static async getUnreadCount() {
    const { rows } = await sql`
      SELECT COUNT(*) as count FROM contacts WHERE is_read = false
    `;
    return parseInt(rows[0].count, 10);
  }
}

