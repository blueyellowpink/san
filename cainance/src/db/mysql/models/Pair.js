"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pairDefine = sequelize => {
    const Pair = sequelize.define('pairs', {
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        slug: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        last24hPrice: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: true,
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: true,
        },
        last24hMarketCap: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: true,
        },
        marketCap: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: true,
        },
        last24hVolume: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: true,
        },
        volume: {
            type: sequelize_1.DataTypes.DECIMAL(65, 8).UNSIGNED,
            allowNull: true,
        },
        isFavourite: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
    });
    return Pair;
};
exports.default = pairDefine;
//# sourceMappingURL=Pair.js.map