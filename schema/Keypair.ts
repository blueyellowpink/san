import { Schema, model } from 'mongoose'

type Pair = {
    publicKey: string
    privateKey: string
}

const PairSchema = new Schema<Pair>(
    {
        publicKey: {
            type: String,
            unique: true,
            required: true,
        },
        privateKey: {
            type: String,
        },
    },
    { _id: false }
)

export type Keypair = {
    accountId: number
    evm: Pair
    solana: Pair
}

export const KeypairSchema = new Schema<Keypair>({
    accountId: {
        type: Number,
        unique: true,
    },
    evm: PairSchema,
    solana: PairSchema,
})

const Keypair = model<Keypair>('Keypair', KeypairSchema, 'keypairs')

export default Keypair
