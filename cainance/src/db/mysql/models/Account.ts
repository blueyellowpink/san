import { Sequelize, DataTypes } from 'sequelize'

const accountDefine = sequelize => {
    const Account = sequelize.define(
        'accounts',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(32),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: true,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        }
    )

    return Account
}

export type Account = {
    id: number
    email: string
    password: string
    phone: string
    createdAt?: any
    updatedAt?: any
}

export default accountDefine
