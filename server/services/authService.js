const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const users = require('../mockdata/users');
const roles = require('../mockdata/roles');
const logger = require('../utils/logger');

function findUserByEmail(email) {
  if (config.USE_MOCK_DB) {
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  // TODO: Implement DB lookup when USE_MOCK_DB is false
  return null;
}

function findRoleById(roleId) {
  if (config.USE_MOCK_DB) {
    return roles.find(r => r.id === roleId);
  }
  // TODO: Implement DB lookup when USE_MOCK_DB is false
  return null;
}

async function authenticateUser(email, password) {
  const user = findUserByEmail(email);
  if (!user) {
    logger.info(`Authentication failed: user not found for email ${email}`);
    return null;
  }
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    logger.info(`Authentication failed: invalid password for email ${email}`);
    return null;
  }
  return user;
}

function generateAccessToken(user) {
  const role = findRoleById(user.roleId);
  const permissions = role ? role.permissions : {};
  const payload = {
    id: user.id,
    siteId: user.siteId,
    departmentId: user.departmentId,
    roleId: user.roleId,
    siteAdmin: user.siteAdmin,
    sysAdmin: user.sysAdmin,
    permissions,
  };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRATION });
}

function generateRefreshToken(user) {
  const payload = { id: user.id };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRATION });
}

function verifyRefreshToken(token) {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    logger.info('Invalid refresh token');
    return null;
  }
}

module.exports = {
  authenticateUser,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
