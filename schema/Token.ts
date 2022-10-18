import { Schema, model } from 'mongoose'
import { ChainSchema, Chain } from './Chain'

export type Token = {
    name: string
    symbol: string
    chains: Array<Chain>
}

export const TokenSchema = new Schema<Token>({
    name: String,
    symbol: String,
    chains: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Chain',
        },
    ],
})

const Token = model<Token>('Token', TokenSchema, 'tokens')
export default Token
