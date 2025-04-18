import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Header({ onToggleSidebar }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between bg-mainGrey text-accentGrey p-4 shadow-md">
      <button
        onClick={onToggleSidebar}
        className="text-accentGrey focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <i className="fas fa-bars fa-lg"></i>
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 mx-4 p-2 rounded bg-gray-700 text-white focus:outline-none"
      />
      <div className="flex items-center space-x-4">
        <span>{user ? user.name : 'Guest'}</span>
        <i className="fas fa-user-circle fa-2x"></i>
        {user && (
          <button
            onClick={logout}
            className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}
