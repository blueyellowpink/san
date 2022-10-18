"use strict";
/* import mongoose from 'mongoose'

import SpotWallet from './schema/Wallet'
import Chain from './schema/Chain'
import Keypair from './schema/Keypair'
import Token from './schema/Token'
import Otp from './schema/Otp'
import UserRefCode from './schema/UserRefCode'
import Ref from './schema/Ref'

const connect = async (uri: string): Promise<void> => {
    await mongoose.connect(uri)
}

export default {
    connect,
    SpotWallet,
    Chain,
    Keypair,
    Token,
    Otp,
    UserRefCode,
    Ref,
} */
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const user_model_1 = tslib_1.__importDefault(require("./models/user.model"));
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