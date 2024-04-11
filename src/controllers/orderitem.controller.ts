import { Request, Response } from 'express';
import { OrderItems }  from "../models/orderitem.models";
import IResponse from "../interfaces/response.interface";

class OrderController {
  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const orderitem = await OrderItems.findByPk(id);
     
      if (orderitem) {
        const response: IResponse = {
          statusCode: 200,
          status: 'success',
          message: 'Role',
          data: orderitem,
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

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orderitems = await OrderItems.findAll();
      const response: IResponse = {
        statusCode: 200,
        status: 'success',
        message: 'Order Item list',
        data: orderitems,
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


  // async updateProduct(req: Request, res: Response): Promise<void> {
  //   try {
  //      const { order_id, customer_id, total_amount, order_date, created_by } = req.body;
  //      const [updatedCount] = await Order.update(
  //       {
  //         customer_id: customer_id,
  //         total_amount: total_amount,
  //         order_date: order_date,
  //         created_by: created_by,
  //       },
  //       {
  //         where: { order_id: order_id }
  //       }
  //     );
  //     if (updatedCount  > 0) {
  //       res.status(200).json({ message: 'Product updated successfully' });
  //     } else {
  //         res.status(404).json({error: "Error"});
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: "error.message" });
  //   }
  // }

  // async deleteProduct(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const deletedCount = await Order.destroy({ where: { order_id: id } });
  //     if (deletedCount) {
  //       res.status(204).send();
  //     } else {
  //       res.status(404).json({ error: "Error" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: "error.message" });
  //   }
  // }
}

export default new OrderController();