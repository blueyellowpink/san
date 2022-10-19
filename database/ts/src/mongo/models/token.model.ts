import { Schema, model } from 'mongoose'

export type Token = {
    name: string
    symbol: string
    icon: string
    createdAt?: number
    updatedAt?: number
}

const TokenSchema = new Schema<Token>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    symbol: {
        type: String,
        unique: true,
        required: true,
    },
    icon: {
        type: String,
        default: '',
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

const Token = model<Token>('Token', TokenSchema, 'tokens')

export default Token
