import { Request, Response } from 'express';
import { UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';
import { DataTypes, Model, Sequelize, literal } from 'sequelize';
import axios, { AxiosError, AxiosResponse } from "axios";

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      
      const {role_id, first_name, middle_name, last_name, email, password, mobile, phone, address1, address2, city, state, country } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
          user_id: 0,
          role_id: role_id,
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
          mobile: mobile,
          phone: phone,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          country: country,
          created_at: new Date(),
          created_by: "1"
      });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error"});
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await UserModel.update(req.body, {
        where: { user_id: id }
      });
      if (updatedUser[0]) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
          res.status(404).json({error: "Error"});
      }
    } catch (error) {
      res.status(500).json({ error: "error.message" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await UserModel.destroy({ where: { user_id: id } });
      if (deletedCount) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Error" });
      }
    } catch (error) {
      res.status(500).json({ error: "error.message" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserModel.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: "error.message" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "error.message" });
    }
  }
}

export default new UserController();