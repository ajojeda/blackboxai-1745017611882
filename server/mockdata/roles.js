const roles = [
  {
    id: 1,
    siteId: 1,
    departmentId: 1,
    name: 'Site Admin',
    permissions: {
      "Site Management": {
        visible: true,
        actions: {
          "Create Site": true,
          "Edit Site": true,
        },
      },
      "Tasks": {
        visible: true,
        actions: {
          "Create Task": true,
          "Edit Task": true,
        },
      },
    },
  },
  {
    id: 2,
    siteId: 1,
    departmentId: 2,
    name: 'Department User',
    permissions: {
      "Site Management": {
        visible: false,
        actions: {
          "Create Site": false,
          "Edit Site": false,
        },
      },
      "Tasks": {
        visible: true,
        actions: {
          "Create Task": true,
          "Edit Task": false,
        },
      },
    },
  },
];

module.exports = roles;
