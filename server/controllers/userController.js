const users = require('../mockdata/users');
const roles = require('../mockdata/roles');
const logger = require('../utils/logger');

// Helper to check if user has access to target user based on site/department/role and admin flags
function canAccessUser(authUser, targetUser) {
  if (authUser.sysAdmin) return true;
  if (authUser.siteAdmin) {
    return authUser.siteId === targetUser.siteId;
  }
  return (
    authUser.siteId === targetUser.siteId &&
    authUser.departmentId === targetUser.departmentId &&
    authUser.roleId === targetUser.roleId
  );
}

function listUsers(req, res) {
  const authUser = req.user;
  const filteredUsers = users.filter(u => canAccessUser(authUser, u));
  res.json(filteredUsers);
}

function getUser(req, res) {
  const authUser = req.user;
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (!canAccessUser(authUser, user)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json(user);
}

function createUser(req, res) {
  const authUser = req.user;
  const newUser = req.body;

  // Validate required fields
  if (!newUser.name || !newUser.email || !newUser.passwordHash || !newUser.siteId || !newUser.departmentId || !newUser.roleId) {
    return res.status(400).json({ message: 'Missing required user fields' });
  }

  // Enforce scoping
  if (!authUser.sysAdmin) {
    if (authUser.siteAdmin) {
      if (newUser.siteId !== authUser.siteId) {
        return res.status(403).json({ message: 'Cannot create user outside your site' });
      }
    } else {
      if (
        newUser.siteId !== authUser.siteId ||
        newUser.departmentId !== authUser.departmentId ||
        newUser.roleId !== authUser.roleId
      ) {
        return res.status(403).json({ message: 'Cannot create user outside your scope' });
      }
    }
  }

  // Check for duplicate email
  if (users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  // Assign new ID
  newUser.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  users.push(newUser);
  logger.info(`User created: ${newUser.email} by ${authUser.email}`);
  res.status(201).json(newUser);
}

function updateUser(req, res) {
  const authUser = req.user;
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const user = users[userIndex];
  if (!canAccessUser(authUser, user)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const updates = req.body;

  // Enforce scoping on updates
  if (!authUser.sysAdmin) {
    if (authUser.siteAdmin) {
      if (updates.siteId && updates.siteId !== authUser.siteId) {
        return res.status(403).json({ message: 'Cannot move user outside your site' });
      }
    } else {
      if (
        (updates.siteId && updates.siteId !== authUser.siteId) ||
        (updates.departmentId && updates.departmentId !== authUser.departmentId) ||
        (updates.roleId && updates.roleId !== authUser.roleId)
      ) {
        return res.status(403).json({ message: 'Cannot update user outside your scope' });
      }
    }
  }

  users[userIndex] = { ...user, ...updates };
  logger.info(`User updated: ${user.email} by ${authUser.email}`);
  res.json(users[userIndex]);
}

function deleteUser(req, res) {
  const authUser = req.user;
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const user = users[userIndex];
  if (!canAccessUser(authUser, user)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  users.splice(userIndex, 1);
  logger.info(`User deleted: ${user.email} by ${authUser.email}`);
  res.status(204).send();
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
