import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export const Image = sequelize.define(
  'Image',
  {
    id:   { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },

    // 把 image_url → url，指明真实列名
    url: {
      type: DataTypes.STRING(512),
      allowNull: false,
      field: 'image_url',          // ★ 关键
    },

    // 如果想要描述
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // created_at 已有，不必再声明
  },
  {
    tableName: 'images',
    timestamps: false,             // 已经自己维护 created_at
    underscored: true,             // 以后新列自动 snake_case
  }
);
