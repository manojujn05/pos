import { Request, Response } from 'express';
import RoleModel from "../models/role.model";
import IResponse from "../interfaces/response.interface";

class RoleController {
  async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const role = await RoleModel.findByPk(id, { attributes: ['role_name'] });
     
      if (role) {
        const response: IResponse = {
          statusCode: 200,
          status: 'success',
          message: 'Role',
          data: role,
        }
        res.status(200).json(response);
      } else {
        const response: IResponse = {
          statusCode: 404,
          status: 'success',
          message: 'No record found',
          data: '',
        }
        res.status(404).json(response);
      }
    } catch (error: any) {
      const response: IResponse = {
        statusCode: 500,
        status: 'error',
        message: error.message,
        data: '',
      }
      res.status(404).json(response);
    }
  }

  async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles = await RoleModel.findAll({ attributes: ['role_name'] });
      const response: IResponse = {
        statusCode: 200,
        status: 'success',
        message: 'Record list',
        data: roles,
      }
      res.status(200).json(response);
      
    } catch (error: any) {
      console.log(error);
      const response: IResponse = {
        statusCode: 500,
        status: 'error',
        message: error.message,
        data: '',
      }
      res.status(500).json(response);
    }
  }
}

export default new RoleController();