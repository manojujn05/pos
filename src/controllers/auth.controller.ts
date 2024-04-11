import { Request, Response } from 'express';
import { UserModel, UserAttributes } from "../models/user.model";
import { AuthService } from '../services/auth.service';
import bcrypt from 'bcryptjs';
import { DataTypes, Model, Sequelize, literal } from 'sequelize';
import axios, { AxiosError, AxiosResponse } from "axios";


class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ where: { email: email } });
      
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = AuthService.generateToken(user.role_id, user.email, user.mobile, user.first_name, user.last_name);
        res.status(201).json({ token });
      } 
    }catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
export default new AuthController;