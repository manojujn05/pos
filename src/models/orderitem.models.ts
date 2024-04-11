import { DataTypes, Model } from 'sequelize';
import db from '../database';
import { Order } from './order.model';
import ProductModel from './product.model';

class OrderItems extends Model {
  public order_item_id!: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
}

OrderItems.init({
  order_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db, 
  modelName: 'OrderItems',
  tableName: 'order_items',
  timestamps: false,
  underscored: true,
});

OrderItems.hasMany(Order, {
  foreignKey: 'order_id',
  constraints: false
});

OrderItems.belongsTo(ProductModel, {
  foreignKey: 'product_id',
  constraints: false
});

export { OrderItems };