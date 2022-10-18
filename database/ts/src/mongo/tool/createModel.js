"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const createModel = ({ collectionName, schema, index }) => {
    const Schema = new mongoose_1.default.Schema(Object.assign(Object.assign({}, schema), { createdAt: {
            type: Number,
            default: Date.now,
        }, updatedAt: {
            type: Number,
            default: Date.now,
        } }));
    Schema.index(Object.assign({ createdAt: -1, updatedAt: -1 }, (index || {})));
    const Model = mongoose_1.default.model(collectionName, Schema, collectionName);
    return Model;
};
exports.default = createModel;
//# sourceMappingURL=createModel.js.map