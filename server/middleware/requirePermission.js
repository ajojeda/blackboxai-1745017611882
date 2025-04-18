function requirePermission(moduleName, actionName) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !user.permissions) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // sysAdmin bypasses all permission checks
    if (user.sysAdmin) {
      return next();
    }

    const modulePermissions = user.permissions[moduleName];
    if (!modulePermissions || !modulePermissions.visible) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    const actionAllowed = modulePermissions.actions && modulePermissions.actions[actionName];
    if (!actionAllowed) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    next();
  };
}

module.exports = requirePermission;
