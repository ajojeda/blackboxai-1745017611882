class Role {
  constructor({ id, siteId, departmentId, name, permissions }) {
    this.id = id;
    this.siteId = siteId;
    this.departmentId = departmentId;
    this.name = name;
    this.permissions = permissions; // JSON object
  }
}

module.exports = Role;
