"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RefSchema = new mongoose_1.Schema({
    f0Id: Number,
    f1Id: Number,
    point: Number,
    createdAt: Number,
});
const Ref = (0, mongoose_1.model)('Ref', exports.RefSchema, 'ref');
exports.default = Ref;
//# sourceMappingURL=Ref.js.map