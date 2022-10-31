"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetOrder = exports.validateCancelOrder = exports.validateAddOrder = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const utils_1 = require("../../../libs/utils");
const protobuf_1 = require("@cainance/protobuf");
const db_1 = require("@cainance/db");
const orderTypes = (0, utils_1.getEnumValues)(protobuf_1.proto.OrderType);
const orderSides = (0, utils_1.getEnumValues)(protobuf_1.proto.OrderSide);
const addOrderArgs = joi_1.default.object({
    pair: joi_1.default.string().uppercase().required(),
    price: joi_1.default.number().greater(0).required(),
    amount: joi_1.default.number().greater(0).required(),
    orderType: joi_1.default.number()
        .valid(...orderTypes)
        .required(),
});
const validateAddOrder = (body) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const args = addOrderArgs.validate(body);
    if (args.error) {
        throw new Error(args.error.details[0].message);
    }
    const pair = yield db_1.redis.HGET('pairs', args.value.pair);
    if (!pair) {
        const found = yield db_1.models.TradingPair.findOne({
            name: args.value.pair,
        })
            .select('_id')
            .lean();
        if (!found) {
            throw new Error('Trading pair not found');
        }
        db_1.redis.HSET('pairs', args.value.pair, 1);
    }
    return args.value;
});
exports.validateAddOrder = validateAddOrder;
const cancelOrderArgs = joi_1.default.object({
    price: joi_1.default.number().greater(0).required(),
    orderId: joi_1.default.number().greater(0).required(),
    orderSide: joi_1.default.number()
        .valid(...orderSides)
        .required(),
});
const validateCancelOrder = body => {
    const args = cancelOrderArgs.validate(body);
    if (args.error) {
        throw new Error(args.error.details[0].message);
    }
    return args.value;
};
exports.validateCancelOrder = validateCancelOrder;
const getOrderArgs = joi_1.default.object({
    pair: joi_1.default.string().uppercase().required(),
    active: joi_1.default.boolean().default(true),
    page: joi_1.default.number().greater(0).required(),
    limit: joi_1.default.number().greater(0).default(10).required(),
});
const validateGetOrder = query => {
    const args = getOrderArgs.validate(query);
    if (args.error) {
        throw new Error(args.error.details[0].message);
    }
    return args.value;
};
exports.validateGetOrder = validateGetOrder;
//# sourceMappingURL=validate.js.map