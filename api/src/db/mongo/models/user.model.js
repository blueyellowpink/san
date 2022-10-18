const { Schema } = require('mongoose')
const collectionNames = require('../collections/collectionNames')
const createModel = require('../tool/createModel')

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

        twoFactorSecret: String,
    },
    index: {
        email: -1,
    },
})

module.exports = UserModel
