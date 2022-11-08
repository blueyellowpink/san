import mongoose from 'mongoose'

const createModel = ({ collectionName, schema, index }) => {
    const Schema = new mongoose.Schema({
        ...schema,
        createdAt: {
            type: Number,
            default: Date.now,
        },
        updatedAt: {
            type: Number,
            default: Date.now,
        },
    })

    Schema.index({
        /* createdAt: -1,
        updatedAt: -1, */
        ...(index || {}),
    })

    const Model = mongoose.model(collectionName, Schema, collectionName)

    return Model
}

export default createModel
