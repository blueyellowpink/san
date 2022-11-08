"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const keypairDefine = sequelize => {
    const keypair = sequelize.define('keypairs', {
        accountId: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        publicKey: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        privateKey: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['accountId', 'publicKey'],
            },
        ],
    });
    return keypair;
};
exports.default = keypairDefine;
//# sourceMappingURL=Keypair.js.map