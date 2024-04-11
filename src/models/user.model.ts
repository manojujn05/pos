import { DataTypes, Model } from 'sequelize';
import db from '../database';

// Define UserAttributes interface
interface UserAttributes {
  user_id: number;
  role_id: number;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email: string;
  password: string;
  mobile?: string | null;
  phone?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  created_at: Date;
  created_by: string;
}


// Define User model class
class UserModel extends Model<UserAttributes> {
  public role_id!: number;
  public first_name!: string;
  public middle_name!: string | null;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public mobile!: string | null;
  public phone!: string | null;
  public address1!: string | null;
  public address2!: string | null;
  public city!: string | null;
  public state!: string | null;
  public country!: string | null;
  public created_at!: Date;
  public created_by!: string;
}

// Initialize User model with sequelize.define()
UserModel.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middle_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: db.literal('CURRENT_TIMESTAMP'),
  },
  created_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db, 
  modelName: 'User',
  tableName: 'user',
  timestamps: false,
  underscored: true,
});

export { UserAttributes, UserModel};