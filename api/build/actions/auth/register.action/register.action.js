"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const checkExisted_1 = tslib_1.__importDefault(require("./checkExisted"));
const createAccount_1 = tslib_1.__importDefault(require("./createAccount"));
const getRefer_1 = tslib_1.__importDefault(require("./getRefer"));
const validateInput_1 = tslib_1.__importDefault(require("./validateInput"));
const registerAction = (args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const input = (0, validateInput_1.default)(args);
    yield (0, checkExisted_1.default)({ email: input.email });
    const [account, refer] = yield Promise.all([
        (0, createAccount_1.default)(input),
        (0, getRefer_1.default)(input),
    ]);
    if (refer === null || refer === void 0 ? void 0 : refer._id)
        account.refer = refer._id;
    yield account.save();
    return {
        account: {
            email: account.email,
            refer: account.refer,
        },
    };
});
exports.default = registerAction;
//# sourceMappingURL=register.action.js.map