'use strict';

const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const con = new Sequelize(config.database,config.username,config.password,{
    hostname : config.hostname,
    dialect : config.dialect,
    logging: false
});

con.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(error => {
    console.log(error);
});


module.exports = {
    con,
    Model,
    DataTypes
};