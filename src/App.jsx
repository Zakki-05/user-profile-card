import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import SearchBar from './components/SearchBar';
import { users as userData } from './data/users';

function App() {
  // Main state to store user data
  const [users, setUsers] = useState([]);
  // State for search input value
  const [searchQuery, setSearchQuery] = useState('');
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for theme (light or dark)
  const [theme, setTheme] = useState('light');

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Simulating a network request with a timeout
    const timer = setTimeout(() => {
      setUsers(userData); // Load dummy data
      setIsLoading(false); // Stop loading after 1.5s
    }, 1500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Connect.</h1>
        <div className="controls">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main>
        {isLoading ? (
          <div className="user-grid">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="user-card-wrapper skeleton" style={{ height: '620px' }}></div>
            ))}
          </div>
        ) : (
          <div className="user-grid">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <div className="no-results">
                <p>No users found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modern CSS for empty state */}
      <style>{`
        .no-results {
          grid-column: 1 / -1;
          padding: 4rem;
          text-align: center;
          background: var(--bg-secondary);
          border-radius: 24px;
          border: 2px dashed var(--border-color);
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}

export default App;
