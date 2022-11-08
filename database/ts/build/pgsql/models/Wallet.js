"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundingWalletDefine = exports.spotWalletDefine = void 0;
const sequelize_1 = require("sequelize");
const spotWalletDefine = sequelize => {
    const wallet = sequelize.define('spot_wallets', {
        accountId: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: 'spot_user_token_pair',
        },
        token: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: 'spot_user_token_pair',
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
            defaultValue: '0.0',
        },
        availableAmount: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
            defaultValue: '0.0',
        },
        inOrderAmount: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
            defaultValue: '0.0',
        },
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['accountId'],
            },
        ],
    });
    return wallet;
};
exports.spotWalletDefine = spotWalletDefine;
const fundingWalletDefine = sequelize => {
    const wallet = sequelize.define('funding_wallets', {
        accountId: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: 'funding_user_token_pair',
        },
        token: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: 'funding_user_token_pair',
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
            defaultValue: '0.0',
        },
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['accountId'],
            },
        ],
    });
    return wallet;
};
exports.fundingWalletDefine = fundingWalletDefine;
//# sourceMappingURL=Wallet.js.map