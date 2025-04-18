import React, { useState, useEffect } from 'react';

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/permissions';

const mockSites = [
  { id: 1, name: 'Stadium A' },
  { id: 2, name: 'Stadium B' },
];

const mockDepartments = [
  { id: 1, siteId: 1, name: 'Security' },
  { id: 2, siteId: 1, name: 'Facilities' },
  { id: 3, siteId: 2, name: 'Security' },
  { id: 4, siteId: 2, name: 'Facilities' },
];

const mockRoles = [
  { id: 1, siteId: 1, departmentId: 1, name: 'Security Lead' },
  { id: 2, siteId: 1, departmentId: 2, name: 'Facilities Manager' },
  { id: 3, siteId: 2, departmentId: 3, name: 'Security Lead' },
  { id: 4, siteId: 2, departmentId: 4, name: 'Facilities Manager' },
];

export default function UserManagement() {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    siteId: '',
    departmentId: '',
    roleId: '',
    siteAdmin: false,
    sysAdmin: false,
  });

  // Filter departments based on selected site
  const filteredDepartments = mockDepartments.filter(
    (d) => d.siteId === Number(form.siteId)
  );

  // Filter roles based on selected site
  const filteredRoles = mockRoles.filter(
    (r) => r.siteId === Number(form.siteId)
  );

  // Permission-based field visibility and editability
  const canEditField = (field) => {
    if (currentUser.sysAdmin) return true;
    if (field === 'siteAdmin' || field === 'sysAdmin') {
      return currentUser.sysAdmin;
    }
    // Example permission checks, adjust as needed
    if (!currentUser.permissions) return false;
    const perm = currentUser.permissions['User Management'];
    if (!perm) return false;
    if (perm.actions && perm.actions[`Edit ${field}`]) return true;
    return false;
  };

  const canViewField = (field) => {
    if (currentUser.sysAdmin) return true;
    if (!currentUser.permissions) return false;
    const perm = currentUser.permissions['User Management'];
    if (!perm) return false;
    if (perm.visible === false) return false;
    if (perm.actions && perm.actions[`View ${field}`]) return true;
    return false;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    // Validate role belongs to selected site
    const role = mockRoles.find((r) => r.id === Number(form.roleId));
    if (!role || role.siteId !== Number(form.siteId)) {
      alert('Selected role does not belong to the selected site.');
      return false;
    }
    // Validate department belongs to selected site
    const department = mockDepartments.find(
      (d) => d.id === Number(form.departmentId)
    );
    if (!department || department.siteId !== Number(form.siteId)) {
      alert('Selected department does not belong to the selected site.');
      return false;
    }
    // Validate admin permissions for assignment
    if (!currentUser.sysAdmin && !currentUser.siteAdmin) {
      if (
        Number(form.siteId) !== currentUser.siteId ||
        Number(form.departmentId) !== currentUser.departmentId
      ) {
        alert('You do not have permission to assign users outside your scope.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // For now, just add to local state
    const newUser = {
      id: users.length + 1,
      ...form,
      passwordHash: 'hashed_password_placeholder',
    };
    setUsers((prev) => [...prev, newUser]);
    setForm({
      name: '',
      email: '',
      password: '',
      siteId: '',
      departmentId: '',
      roleId: '',
      siteAdmin: false,
      sysAdmin: false,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
        {canViewField('name') && (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={!canEditField('name')}
              className={`w-full p-2 rounded bg-gray-700 text-white ${
                !canEditField('name') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
        )}
        {canViewField('email') && (
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={!canEditField('email')}
              className={`w-full p-2 rounded bg-gray-700 text-white ${
                !canEditField('email') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
        )}
        {canViewField('password') && (
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={!canEditField('password')}
              className={`w-full p-2 rounded bg-gray-700 text-white ${
                !canEditField('password') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
        )}
        {canViewField('siteId') && (
          <div>
            <label className="block text-sm font-medium mb-1">Site</label>
            <select
              name="siteId"
              value={form.siteId}
              onChange={handleChange}
              disabled={!canEditField('siteId')}
              className={`w-full p-2 rounded bg-gray-700 text-white ${
                !canEditField('siteId') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Select Site</option>
              {mockSites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {canViewField('departmentId') && (
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              disabled={!canEditField('departmentId')}
              className={`w-full p-2 rounded bg-gray-700 text-white ${
                !canEditField('departmentId') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Select Department</option>
              {filteredDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {canViewField('roleId') && (
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              disabled={!canEditField('roleId')}
              className={`w-full p-2 rounded bg-gray-700 text-white ${
                !canEditField('roleId') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <option value="">Select Role</option>
              {filteredRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {canViewField('siteAdmin') && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="siteAdmin"
              checked={form.siteAdmin}
              onChange={handleChange}
              disabled={!canEditField('siteAdmin')}
              className="form-checkbox"
            />
            <label>Site Admin</label>
          </div>
        )}
        {canViewField('sysAdmin') && (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sysAdmin"
              checked={form.sysAdmin}
              onChange={handleChange}
              disabled={!canEditField('sysAdmin')}
              className="form-checkbox"
            />
            <label>System Admin</label>
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white"
        >
          Add User
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-2">Users</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-gray-800 rounded">
            <div>
              <strong>{user.name}</strong> ({user.email})
            </div>
            <div>
              Site: {mockSites.find((s) => s.id === Number(user.siteId))?.name || 'N/A'}, Department:{' '}
              {mockDepartments.find((d) => d.id === Number(user.departmentId))?.name || 'N/A'}, Role:{' '}
              {mockRoles.find((r) => r.id === Number(user.roleId))?.name || 'N/A'}
            </div>
            <div>
              Site Admin: {user.siteAdmin ? 'Yes' : 'No'}, System Admin: {user.sysAdmin ? 'Yes' : 'No'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
