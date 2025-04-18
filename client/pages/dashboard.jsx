import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-mainGrey text-accentGrey">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="p-6 flex-1 overflow-auto">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user ? user.name : 'Guest'}</h1>
          <p>This is your dashboard. Content will be permission-driven and dynamic.</p>
        </main>
      </div>
    </div>
  );
}
