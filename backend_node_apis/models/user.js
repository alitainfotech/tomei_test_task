'use strict';

const { con, Model, DataTypes } = require('../connection');

class User extends Model{};

/* user model */
User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        field:"created_at",
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        field:"updated_at",
        allowNull: false,
        type: DataTypes.DATE
    }
},{
    sequelize: con,
    modelName : 'User',
    tableName: 'users'
})

module.exports = User;