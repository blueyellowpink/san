"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Wallet_1 = tslib_1.__importDefault(require("./schema/Wallet"));
const Chain_1 = tslib_1.__importDefault(require("./schema/Chain"));
const Keypair_1 = tslib_1.__importDefault(require("./schema/Keypair"));
const Token_1 = tslib_1.__importDefault(require("./schema/Token"));
const Otp_1 = tslib_1.__importDefault(require("./schema/Otp"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const UserRefCode_1 = tslib_1.__importDefault(require("./schema/UserRefCode"));
const Ref_1 = tslib_1.__importDefault(require("./schema/Ref"));
const connect = (uri) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(uri);
});
exports.default = {
    connect,
    SpotWallet: Wallet_1.default,
    Chain: Chain_1.default,
    Keypair: Keypair_1.default,
    Token: Token_1.default,
    Otp: Otp_1.default,
    UserRefCode: UserRefCode_1.default,
    Ref: Ref_1.default,
};
//# sourceMappingURL=index.js.map