import { Schema, model } from 'mongoose'

export type Chain = {
    name: string
    symbol: string
    type: string
    createdAt?: number
    updatedAt?: number
}

export const ChainSchema = new Schema<Chain>({
    name: {
        type: String,
        unique: true,
    },
    symbol: String,
    type: {
        type: String,
        enum: ['evm', 'solana', 'near', 'dot'],
        required: true,
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

const Chain = model<Chain>('Chain', ChainSchema, 'chains')
export default Chain
