const bcrypt = require('bcrypt');

const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@goodierun.com',
    passwordHash: bcrypt.hashSync('AdminPass123!', 10),
    siteId: 1,
    departmentId: 1,
    roleId: 1,
    siteAdmin: true,
    sysAdmin: false,
  },
  {
    id: 2,
    name: 'System Admin',
    email: 'sysadmin@goodierun.com',
    passwordHash: bcrypt.hashSync('SysAdminPass123!', 10),
    siteId: null,
    departmentId: null,
    roleId: null,
    siteAdmin: false,
    sysAdmin: true,
  },
];

module.exports = users;
