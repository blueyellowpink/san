import { Schema, model } from 'mongoose'

type TokenPair = {
    base: Schema.Types.ObjectId
    quote: Schema.Types.ObjectId
}

const TokenPairSchema = new Schema<TokenPair>(
    {
        base: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
            required: true,
        },
        quote: {
            type: Schema.Types.ObjectId,
            ref: 'Token',
            required: true,
        },
    },
    { _id: false }
)

type TradingPairSummaryData = {
    price: Schema.Types.Decimal128
    volume: Schema.Types.Decimal128
    minPrice: Schema.Types.Decimal128
    maxPrice: Schema.Types.Decimal128
}

type TradingPairSummary = {
    last24h: TradingPairSummaryData
    last4h: TradingPairSummaryData
    last1h: TradingPairSummaryData
}

type TradingPairPrice = {
    amount: Schema.Types.Decimal128
    isUp: boolean
}

export type TradingPair = {
    name: string
    token: TradingPair
    marketCap: Schema.Types.Decimal128
    summary: TradingPairSummary
    price: TradingPairPrice
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
    summary: {
        last24h: {
            price: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            volume: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            minPrice: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            maxPrice: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
        },
        last4h: {
            price: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            volume: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            minPrice: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            maxPrice: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
        },
        last1h: {
            price: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            volume: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            minPrice: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
            maxPrice: {
                type: Schema.Types.Decimal128,
                default: 0.0,
            },
        },
    },
    price: {
        amount: {
            type: Schema.Types.Decimal128,
            default: 0.0,
        },
        isUp: {
            type: Boolean,
            default: false,
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

TradingPairSchema.index({ marketCap: -1 })

const TradingPair = model<TradingPair>(
    'TradingPair',
    TradingPairSchema,
    'trading_pairs'
)

export default TradingPair
