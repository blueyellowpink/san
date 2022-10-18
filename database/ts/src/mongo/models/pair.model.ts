import { Schema, model } from 'mongoose'

type TradingPairSummary = {
    price: Schema.Types.Decimal128
    volume: Schema.Types.Decimal128
}

type TokenPair = {
    cryptocurrency: Schema.Types.ObjectId
    stablecoin: Schema.Types.ObjectId
}

const TokenPairSchema = new Schema<TokenPair>(
    {
        cryptocurrency: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
            required: true,
        },
        stablecoin: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
            required: true,
        },
    },
    { _id: false }
)

export type TradingPair = {
    name: string
    token: TradingPair
    marketCap: Schema.Types.Decimal128
    last24h: TradingPairSummary
    current: TradingPairSummary
    isFavorite: boolean
    createdAt?: number
    updatedAt?: number
}

const TradingPairSchema = new Schema<TradingPair>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    token: TokenPairSchema,
    marketCap: {
        type: Schema.Types.Decimal128,
        default: 0.0,
    },
    last24h: {
        price: {
            type: Schema.Types.Decimal128,
            default: 0.0,
        },
        volume: {
            type: Schema.Types.Decimal128,
            default: 0.0,
        },
    },
    current: {
        price: {
            type: Schema.Types.Decimal128,
            default: 0.0,
        },
        volume: {
            type: Schema.Types.Decimal128,
            default: 0.0,
        },
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: Date.now,
    },
})

const TradingPair = model<TradingPair>(
    'TradingPair',
    TradingPairSchema,
    'trading_pairs'
)

export default TradingPair
