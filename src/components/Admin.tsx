import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source: string;
  created_at: string;
  is_read: boolean;
}

interface ContactsResponse {
  success: boolean;
  contacts: Contact[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: {
    total: number;
    unread: number;
  };
}

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, unread: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });

  // Check for saved session on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email');
    const savedSecret = localStorage.getItem('admin_secret');
    const savedAuth = localStorage.getItem('admin_authenticated');
    
    if (savedEmail && savedSecret && savedAuth === 'true') {
      setAdminEmail(savedEmail);
      setAdminSecret(savedSecret);
      fetchContacts(savedEmail, savedSecret);
    }
  }, []);

  const fetchContacts = async (email: string, secret: string, page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/contacts?page=${page}&limit=20`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${email}:${secret}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        setIsAuthenticated(false);
        setError('Invalid admin credentials');
        localStorage.clear();
        setIsLoading(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ContactsResponse = await response.json();
      setContacts(data.contacts || []);
      setStats(data.stats || { total: 0, unread: 0 });
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 1 });
      setCurrentPage(page);
      setIsAuthenticated(true);
      
      // Save session to localStorage
      localStorage.setItem('admin_email', email);
      localStorage.setItem('admin_secret', secret);
      localStorage.setItem('admin_authenticated', 'true');
      
    } catch (err) {
      setIsAuthenticated(false);
      setError(`Failed to connect to server: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Error fetching contacts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail.trim() && adminSecret.trim()) {
      fetchContacts(adminEmail, adminSecret);
    }
  };

  const handleContactAction = async (contactId: number, action: 'mark_read' | 'delete') => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminEmail}:${adminSecret}`
        },
        body: JSON.stringify({ action, contactId })
      });
      
      if (response.ok) {
        // Refresh the contacts list
        fetchContacts(adminEmail, adminSecret, currentPage);
      } else {
        const data = await response.json();
        alert(data.error || `Failed to ${action} contact`);
      }
    } catch (err) {
      alert(`Error ${action} contact`);
      console.error('Error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setAdminEmail('');
    setAdminSecret('');
    setError(null);
    setContacts([]);
    setStats({ total: 0, unread: 0 });
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.pages) {
      fetchContacts(adminEmail, adminSecret, page);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Admin Login
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                id="adminEmail"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter admin email"
                required
              />
            </div>
            
            <div>
              <label htmlFor="adminSecret" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                id="adminSecret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Contact Management
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total: {stats.total} | Unread: {stats.unread}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Logged in as: {adminEmail}
                </span>
                <button
                  onClick={() => fetchContacts(adminEmail, adminSecret, currentPage)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Refresh'}
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                >
                  View Portfolio
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          {isLoading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-6 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                No contact submissions yet.
              </div>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {contacts.map(contact => (
                  <div key={contact.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${contact.is_read ? 'bg-gray-300' : 'bg-blue-500'}`}></div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {contact.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {contact.email} {contact.phone && `• ${contact.phone}`}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              {formatDate(contact.created_at)}
                            </div>
                          </div>
                        </div>
                        
                        {contact.subject && (
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Subject: {contact.subject}
                          </div>
                        )}
                        
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-4">
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {contact.message}
                          </p>
                        </div>
                        
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          Source: {contact.source}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4">
                      {!contact.is_read && (
                        <button
                          onClick={() => handleContactAction(contact.id, 'mark_read')}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this contact?')) {
                            handleContactAction(contact.id, 'delete');
                          }
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Page {pagination.page} of {pagination.pages} ({pagination.total} total)
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage >= pagination.pages}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
