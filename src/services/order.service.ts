
import { CustomerModel  } from '../models/customer.model';
export class OrderService {
  async CheckCustomer(email: string): Promise<number> { 
    const cust = await CustomerModel.findOne({ where: { email: email } }); 
      if (cust && cust.customer_id > 0) { 
        return cust.customer_id;
      } else {
        return 0;
      }
  }
}