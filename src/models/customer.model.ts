import { DataTypes, Model } from 'sequelize';
import db from '../database';


// Define Customer model class
class CustomerModel extends Model {
  public customer_id!: number;
  public name!: string;
  public email!: string;
  public phone!: string | null;
  public address!: string | null;
  public created_at!: Date;
  public created_by!: string;
}

// Initialize User model with sequelize.define()
CustomerModel.init({
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: db.literal('CURRENT_TIMESTAMP'),
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: db, 
  modelName: 'Customer',
  tableName: 'customers',
  timestamps: false,
  underscored: true,
});

export { CustomerModel };