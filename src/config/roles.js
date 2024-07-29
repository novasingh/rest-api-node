const allRoles = {
  driver: ['get', 'manage'],
  manager: ['get', 'manage', 'deleteDriver'],
  admin: ['get', 'manage', 'deleteDriver', 'deleteManager'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
