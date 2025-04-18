import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    path: '/dashboard',
    permission: { module: 'Dashboard', action: 'View' },
  },
  {
    label: 'User Management',
    icon: 'fas fa-users',
    path: '/admin/UserManagement',
    permission: { module: 'User Management', action: 'View' },
  },
  {
    label: 'Role Management',
    icon: 'fas fa-user-shield',
    path: '/admin/RoleManagement',
    permission: { module: 'Role Management', action: 'View' },
  },
  {
    label: 'Department Management',
    icon: 'fas fa-building',
    path: '/admin/DepartmentManagement',
    permission: { module: 'Department Management', action: 'View' },
  },
  {
    label: 'Site Management',
    icon: 'fas fa-map-marker-alt',
    path: '/admin/SiteManagement',
    permission: { module: 'Site Management', action: 'View' },
  },
  {
    label: 'Site Appearance Settings',
    icon: 'fas fa-paint-brush',
    path: '/admin/SiteAppearanceSettings',
    permission: { module: 'Site Appearance', action: 'View' },
  },
];

import { hasPermission } from '../utils/permissions';

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = menuItems.filter(item => {
    if (!hasPermission(user, item.permission.module, item.permission.action)) {
      return false;
    }
    if (!searchTerm) return true;
    return item.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`bg-mainGrey text-accentGrey h-full flex flex-col transition-width duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-lg font-bold">GoodieRun</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-accentGrey focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="p-2">
        {!collapsed && (
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      <nav className="flex-1 overflow-y-auto">
        {filteredMenu.map(item => (
          <a
            key={item.path}
            href={item.path}
            className="flex items-center p-3 hover:bg-gray-700 transition-colors"
          >
            <i className={`${item.icon} w-6 text-center`}></i>
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
}
