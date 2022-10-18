"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const accountDefine = sequelize => {
    const Account = sequelize.define('accounts', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.STRING(32),
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    });
    return Account;
};
exports.default = accountDefine;
//# sourceMappingURL=Account.js.map