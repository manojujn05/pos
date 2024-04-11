import { Request, Response } from 'express';
import { Order }  from "../models/order.model";
import IResponse from "../interfaces/response.interface";
import { CustomerModel  } from '../models/customer.model';
import db from '../database';
import { OrderItems } from '../models/orderitem.models';
import ProductModel from '../models/product.model';
import { OrderService } from '../services/order.service';

class OrderController {
  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await Order.findOne({
        where: { order_id: id },
        include: [
          {
            model: OrderItems,
            attributes: ['quantity', 'price'], 
            include: [
              {
                model: ProductModel,
                attributes: ['name'], 
              },
            ],
          },
          {
            model: CustomerModel, 
            attributes: ['name', 'email', 'phone'], 
          },
        ],
        attributes: ['order_id', 'order_date', 'total_amount'], 
      });
     
      if (order) {
        const response: IResponse = {
          statusCode: 200,
          status: 'success',
          message: 'Order details retrieved successfully',
          data: order,
        }
        res.status(200).json(response);
      } else {
        const response: IResponse = {
          statusCode: 404,
          status: 'error',
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
      res.status(500).json(response);
    }
  }
  
  
  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      //const orders = await Order.findAll();
      OrderItems.belongsTo(Order, { foreignKey: 'order_id' }); 
      OrderItems.belongsTo(ProductModel, { foreignKey: 'product_id' }); 

      const result = await OrderItems.findAll({
        include: [
          {
            model: Order,
            attributes: ['order_id', 'order_date', 'total_amount'], 
          },
          {
            model: ProductModel,
            attributes: ['name'], 
          },
        ],
        attributes: ['order_id', 'quantity', 'price'], 
      });
      const response: IResponse = {
        statusCode: 200,
        status: 'success',
        message: 'Orders list',
        data: result,
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
  
  async createOrder(req: Request, res: Response): Promise<void> {
    interface Product {
        product_id: number;
        name: string;
        quantity: number;
        price: number;
    }

    try {
        const { products, name, email, phone, address } = req.body;
        let totalPrice = 0;
          // Calculate total price
          products.forEach((product: Product) => {
            const subtotal = product.quantity * product.price;
            totalPrice += subtotal;
        });
        const result = await db.transaction(async (t) => {
            // Create customer
            const os =  new OrderService();
            let cust_id;
            let res = await os.CheckCustomer(email);
            console.log(res);
            if(res == 0){
              const customer = await CustomerModel.create({
                name: name,
                email: email,
                phone: phone,
                address: address
            }, { transaction: t });
            cust_id = customer.customer_id;
            } else {
              cust_id = res ;
            }
           

            // Create order
            const order = await Order.create({
                customer_id: cust_id,
                total_amount: totalPrice,
                order_date: new Date(),
                created_by: '1',
            }, { transaction: t });
            const order_id = order.order_id;

            // Create order items
            const orderItemsPromises: Promise<void>[] = products.map((product: Product) => {
                return OrderItems.create({
                    order_id: order_id,
                    product_id: product.product_id,
                    order_date: new Date(),
                    quantity: product.quantity,
                    price: product.price
                }, { transaction: t });
            });
            // Wait for all order items to be created
            await Promise.all(orderItemsPromises);
            return order; 
        });

        // Send success response
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error: any) {
        // Send error response
        console.error(error);
        const response: IResponse = {
            statusCode: 500,
            status: 'error',
            message: error.message,
            data: '',
        };
        res.status(500).json(response);
    }
}



  async getProductId(name: string): Promise<number> {
    const product = await ProductModel.findOne({ where: { name: name } });
    if (product) {
      return product.product_id; 
    } else {
        throw new Error(`Product with name ${name} not found`);
    }
  }
 

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
       const { order_id, customer_id, total_amount, order_date, created_by } = req.body;
       const [updatedCount] = await Order.update(
        {
          customer_id: customer_id,
          total_amount: total_amount,
          order_date: order_date,
          created_by: created_by,
        },
        {
          where: { order_id: order_id }
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
      const deletedCount = await Order.destroy({ where: { order_id: id } });
      if (deletedCount) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Error" });
      }
    } catch (error) {
      res.status(500).json({ error: "error.message" });
    }
  }
}

export default new OrderController();