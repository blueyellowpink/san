"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = exports.CainanceSequel = exports.models = exports.connectToMongo = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const user_model_1 = tslib_1.__importDefault(require("./mongo/models/user.model"));
const token_model_1 = tslib_1.__importDefault(require("./mongo/models/token.model"));
const pair_model_1 = tslib_1.__importDefault(require("./mongo/models/pair.model"));
const chain_model_1 = tslib_1.__importDefault(require("./mongo/models/chain.model"));
const pgsql_1 = tslib_1.__importDefault(require("./pgsql"));
exports.CainanceSequel = pgsql_1.default;
const redis_1 = tslib_1.__importDefault(require("./redis"));
exports.redis = redis_1.default;
mongoose_1.default.set('debug', true);
const connectToMongo = (uri) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(uri);
    console.log('Mongo connected');
});
exports.connectToMongo = connectToMongo;
exports.models = {
    user: user_model_1.default,
    Token: token_model_1.default,
    TradingPair: pair_model_1.default,
    Chain: chain_model_1.default,
};
//# sourceMappingURL=index.js.map