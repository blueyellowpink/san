import { Schema, model } from 'mongoose'
import { Keypair } from './Keypair'
import { TokenSchema, Token } from './Token'

type Asset = {
    token: Token
    balance: number
}

export type SpotWallet = {
    accountId: number
    assets: Array<Asset>
    keypair: Keypair
}

export type MarginWallet = {
    accountId: number
    assets: Array<Asset>
    keypair: Keypair
}

const AssetSchema = new Schema<Asset>(
    {
        token: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
            required: true,
        },
        balance: {
            type: Schema.Types.Decimal128,
            default: 0.0,
        },
    },
    { _id: false }
)

const SpotWalletSchema = new Schema<SpotWallet>({
    accountId: {
        type: Number,
        unique: true,
        required: true,
    },
    assets: {
        type: [AssetSchema],
        required: true,
    },
    keypair: {
        type: Schema.Types.ObjectId,
        ref: 'Keypair',
        required: true,
    },
})

const SpotWallet = model<SpotWallet>(
    'SpotWallet',
    SpotWalletSchema,
    'spot_wallets'
)
export default SpotWallet
