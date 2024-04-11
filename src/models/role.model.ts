import { DataTypes, Model } from 'sequelize';
import db from '../database';

class RoleModel extends Model {
  public role_id!: number;
  public role_name!: string;
  public role_description!: string | null;
}

RoleModel.init({
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: db, 
  modelName: 'Role',
  tableName: 'role',
  timestamps: false,
  underscored: true,
});

export default RoleModel;