import { DataTypes } from 'sequelize'

export const spotWalletDefine = sequelize => {
	const wallet = sequelize.define('spot_wallets', {
        accountId: {
            type: DataTypes.TEXT,
            allowNull: false,
			unique: 'user_token_pair',
        },
		token: {
			type: DataTypes.TEXT,
            allowNull: false,
			unique: 'user_token_pair',
		},
		amount: {
			type: DataTypes.DECIMAL(19, 8).UNSIGNED,
			allowNull: false,
			defaultValue: '0.0',
		},
	}, {
		indexes: [
			{
				using: 'BTREE',
				fields: [
					'accountId'
				]
			}
		]
	})

	return wallet
}
