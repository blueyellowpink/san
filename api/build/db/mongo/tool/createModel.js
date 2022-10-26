"use strict";
const { default: mongoose } = require('mongoose');
const createModel = ({ collectionName, schema, index }) => {
    const Schema = new mongoose.Schema(Object.assign(Object.assign({}, schema), { createdAt: {
            type: Number,
            default: Date.now,
        }, updatedAt: {
            type: Number,
            default: Date.now,
        } }));
    Schema.index(Object.assign({ createdAt: -1, updatedAt: -1 }, (index || {})));
    const Model = mongoose.model(collectionName, Schema, collectionName);
    return Model;
};
module.exports = createModel;
//# sourceMappingURL=createModel.js.map