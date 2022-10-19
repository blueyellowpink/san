import { Schema } from 'mongoose'
import collectionNames from '../collections/collectionNames'
import createModel from '../tool/createModel'

const KeypairSchema = new Schema(
    {
        publicKey: String,
        privateKey: String,
        path: String,
    },
    { _id: false }
)

const UserModel = createModel({
    collectionName: collectionNames.user,
    schema: {
        email: String,
        password: String,
        refCode: String,

        status: {
            type: String,
            enum: ['created', 'confirmed', 'restricted'],
            default: 'created',
        },

        refer: {
            type: Schema.Types.ObjectId,
            ref: collectionNames.user,
        },

        confirmedAt: { type: Number, default: 0 },

        keypair: {
            type: Map,
            of: KeypairSchema,
        },

        twoFactorSecret: String,
    },
    index: {
        email: -1,
    },
})

export default UserModel
