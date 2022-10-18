"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const user_model_1 = tslib_1.__importDefault(require("./mongo/models/user.model"));
mongoose_1.default.set('debug', true);
const connectToMongo = (uri) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(uri);
    console.log('Mongo connected');
});
exports.connectToMongo = connectToMongo;
exports.default = {
    user: user_model_1.default,
};
//# sourceMappingURL=index.js.map