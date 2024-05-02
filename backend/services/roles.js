import Role from '../models/roles.js';

export const createRole = async (roleData) => {

  const existingRole = await Role.findOne({ accessModules: { $all: roleData.accessModules } });
  if (existingRole) {
    throw new Error('Role with the same name already exists');
  }

  if (roleData.accessModules.length !== new Set(roleData.accessModules).size) {
    throw new Error('Access modules must be unique');
  }

  return await Role.create(roleData);
};


export const getAllRoles = async () => {
  return await Role.find({},{roleName:1,isActive:1,accessModules:1});
};

export const getRoleById = async (roleId) => {
  return await Role.findOne({_id:roleId});
};
export const updateRole = async (roleId, updatedData) => {
  let role = await getRoleById(roleId);
  if (!role) {
    throw new Error('Role not found');
  }

  const { roleName, accessModulesToAdd, accessModulesToRemove } = updatedData;
  if (accessModulesToAdd && accessModulesToAdd.length !== new Set(accessModulesToAdd).size) {
    throw new Error('Access modules to add must be unique');
  }
  if(roleName){
    role.roleName = roleName;
  }

  if (accessModulesToAdd) {
    // Insert unique access modules
    role.accessModules.push(...accessModulesToAdd.filter(module => !role.accessModules.includes(module)));
  }
  if (accessModulesToRemove) {
    accessModulesToRemove.forEach(module => {
      const index = role.accessModules.indexOf(module);
      if (index !== -1) {
        role.accessModules.splice(index, 1);
      }
    });
  }

  return await role.save();
};

