import { DataTypes } from 'sequelize'

const keypairDefine = sequelize => {
    const keypair = sequelize.define(
        'keypairs',
        {
            accountId: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            publicKey: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            privateKey: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            indexes: [
                {
                    using: 'BTREE',
                    fields: ['accountId', 'publicKey'],
                },
            ],
        }
    )

    return keypair
}

export type Keypair = {
    accountId: string
    publicKey: string
    privateKey: string
    createdAt?: any
    updatedAt?: any
}

export default keypairDefine
