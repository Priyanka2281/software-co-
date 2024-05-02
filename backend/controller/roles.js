import * as roleService from '../services/roles.js';
import httpStatus from 'http-status';

export const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    return res.status(201).send({data:role});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    return res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Role not found' });
    }
    res.status(httpStatus.OK).json(role);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    await roleService.deleteRole(req.params.roleId);
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};
