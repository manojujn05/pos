import { DataTypes, Model } from 'sequelize';
import db from '../database';

class ProductModel extends Model {
  public product_id!: number;
  public name!: string;
  public description!: string | null;
  public weight!: number | null;
  public size!: string | null;
  public color!: string | null;
  public price!: string | null;
  public categories!: string | null;
}

ProductModel.init({
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: db, 
  modelName: 'Product',
  tableName: 'products',
  timestamps: false,
  underscored: true,
});

export default ProductModel;