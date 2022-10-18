import { Sequelize, DataTypes } from 'sequelize'

const pairDefine = sequelize => {
    const Pair = sequelize.define(
        'pairs',
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            slug: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            last24hPrice: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: true,
            },
            price: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: true,
            },
            last24hMarketCap: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: true,
            },
            marketCap: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: true,
            },
            last24hVolume: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: true,
            },
            volume: {
                type: DataTypes.DECIMAL(65, 8).UNSIGNED,
                allowNull: true,
            },
            isFavourite: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            createdAt: true,
            updatedAt: true,
        }
    )

    return Pair
}

export type Pair = {
    id: number
    name: string
    slug: string
    last24hPrice: number
    price: number
    last24hMarketCap: number
    marketCap: number
    last24hVolume: number
    volume: number
    isFavourite: boolean
    createdAt?: any
    updatedAt?: any
}

export default pairDefine
