"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tradeDefine = sequelize => {
    const Trade = sequelize.define('trades', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        pairId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                key: 'id',
                model: 'pairs',
            },
        },
        orderId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                key: 'id',
                model: 'orders',
            },
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        executed: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
        fee: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: false,
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    });
    return Trade;
};
exports.default = tradeDefine;
//# sourceMappingURL=Trade.js.map