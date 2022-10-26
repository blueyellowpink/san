"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotWalletDefine = void 0;
const sequelize_1 = require("sequelize");
const spotWalletDefine = sequelize => {
    const wallet = sequelize.define('spotWallets', {
        accountId: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: 'user_token_pair',
        },
        token: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
            unique: 'user_token_pair',
        },
        amount: {
            type: sequelize_1.DataTypes.DECIMAL(19, 8).UNSIGNED,
            allowNull: false,
            defaultValue: '0.0',
        },
    }, {
        indexes: [
            {
                name: 'accountId_index',
                using: 'BTREE',
                fields: [
                    'accountId'
                ]
            }
        ]
    });
    return wallet;
};
exports.spotWalletDefine = spotWalletDefine;
//# sourceMappingURL=Wallet.js.map