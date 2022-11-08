import mongoose, { Schema } from 'mongoose'
import collectionNames from '../collections/collectionNames'

const KeypairSchema = new Schema(
    {
        publicKey: String,
        privateKey: String,
		chainType: String,
    },
    { _id: false }
)

const UserSchema = new mongoose.Schema({
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

	keypair: [KeypairSchema],

	twoFactorSecret: String,

	createdAt: {
		type: Number,
		default: Date.now,
	},

	updatedAt: {
		type: Number,
		default: Date.now,
	},
})

UserSchema.index({ email: 1 })
UserSchema.index({ 'keypair.publicKey': 1 })
UserSchema.index({ 'keypair.chainType': 1 })

const UserModel = mongoose.model(collectionNames.user, UserSchema)

export default UserModel
