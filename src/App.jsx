


import React, { useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from './utils/auth';
import Login from './components/Login';
import MusicLibrary from './MusicLibrary';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogin = user => setUser(user);
  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
       
    
     <MusicLibrary user={user} onLogout={handleLogout} />

    </div>
  );
}
