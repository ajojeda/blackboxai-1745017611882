class User {
  constructor({ id, name, email, passwordHash, siteId, departmentId, roleId, siteAdmin, sysAdmin }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.siteId = siteId;
    this.departmentId = departmentId;
    this.roleId = roleId;
    this.siteAdmin = siteAdmin;
    this.sysAdmin = sysAdmin;
  }
}

module.exports = User;
