const authService = require('../services/authService');
const logger = require('../utils/logger');

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await authService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Fetch role permissions for the user
    const role = require('../mockdata/roles').find(r => r.id === user.roleId);
    const permissions = role ? role.permissions : {};

    const accessToken = authService.generateAccessToken(user);
    const refreshToken = authService.generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        siteId: user.siteId,
        departmentId: user.departmentId,
        roleId: user.roleId,
        siteAdmin: user.siteAdmin,
        sysAdmin: user.sysAdmin,
        permissions,
      },
    });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing' });
  }

  const payload = authService.verifyRefreshToken(refreshToken);
  if (!payload) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  // For mock DB, find user by id
  const user = require('../mockdata/users').find(u => u.id === payload.id);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const accessToken = authService.generateAccessToken(user);
  return res.json({ accessToken });
}

function logout(req, res) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  return res.json({ message: 'Logged out successfully' });
}

module.exports = {
  login,
  refresh,
  logout,
};
