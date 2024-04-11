import { DataTypes, Model } from 'sequelize';
import db from '../database';
import { CustomerModel } from './customer.model';
import { OrderItems } from './orderitem.models';

// Define Order model class
class Order extends Model {
  public order_id!: number;
  public customer_id!: number;
  public total_amount!: number;
  public order_date!: Date;
  public created_by!: string;

}

// Initialize Order model with sequelize.define()
Order.init({
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: db.literal('CURRENT_TIMESTAMP'),
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: db, 
  modelName: 'Order',
  tableName: 'orders',
  timestamps: false,
  underscored: true,
});

Order.hasOne(CustomerModel, {
  foreignKey: 'customer_id',
  constraints: false,
});

Order.belongsTo(OrderItems, {
  foreignKey: 'order_id',
  constraints: false,
});

export { Order };