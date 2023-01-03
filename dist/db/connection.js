"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node', 'root', '20121578chori', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: false
});
/*
nombre de db
username
userpass
objeto de configuracion
*/
exports.default = db;
//# sourceMappingURL=connection.js.map