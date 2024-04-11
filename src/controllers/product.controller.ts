import { Request, Response } from 'express';
import ProductModel from "../models/product.model";
import IResponse from "../interfaces/response.interface";

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, weight, size, color, price, categories} = req.body;
      const categoriesString = JSON.stringify(categories);
      const product = await ProductModel.create({
          product_id: 0,
          name: name,
          description: description,
          weight: weight,
          size: size,
          color: color,
          price: price,
          categories: categoriesString,
      });
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error"});
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, weight, size, color, price, categories} = req.body;
      const [updatedCount] = await ProductModel.update(
        {
          name: name,
          description: description,
          weight: weight,
          size: size,
          color: color,
          price: price,
          categories: categories,
        },
        {
          where: { product_id: id }
        }
      );
      if (updatedCount  > 0) {
        res.status(200).json({ message: 'Product updated successfully' });
      } else {
          res.status(404).json({error: "Error"});
      }
    } catch (error) {
      res.status(500).json({ error: "error.message" });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedCount = await ProductModel.destroy({ where: { user_id: id } });
      if (deletedCount) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Error" });
      }
    } catch (error) {
      res.status(500).json({ error: "error.message" });
    }
  }
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await ProductModel.findByPk(id);
     
      if (product) {
        const response: IResponse = {
          statusCode: 200,
          status: 'success',
          message: 'Role',
          data: product,
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

  async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductModel.findAll();
      const response: IResponse = {
        statusCode: 200,
        status: 'success',
        message: 'Record list',
        data: product,
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

export default new ProductController();