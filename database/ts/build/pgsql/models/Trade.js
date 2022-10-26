"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tradeDefine = sequelize => {
    const Trade = sequelize.define('trades', {
        price: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        executedPrice: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
        fee: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
        },
    });
    return Trade;
};
exports.default = tradeDefine;
//# sourceMappingURL=Trade.js.map