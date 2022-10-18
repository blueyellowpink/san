import { Schema, model } from 'mongoose'

export type Chain = {
    name: string
    type: string
}

export const ChainSchema = new Schema<Chain>({
    name: {
        type: String,
        unique: true,
    },
    type: String,
})

const Chain = model<Chain>('Chain', ChainSchema, 'chains')
export default Chain
