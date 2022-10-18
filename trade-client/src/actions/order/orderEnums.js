"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = exports.OrderSide = void 0;
var OrderType;
(function (OrderType) {
    OrderType[OrderType["LIMIT"] = 0] = "LIMIT";
    OrderType[OrderType["MARKET"] = 1] = "MARKET";
})(OrderType || (OrderType = {}));
exports.OrderType = OrderType;
var OrderSide;
(function (OrderSide) {
    OrderSide[OrderSide["ASK"] = 0] = "ASK";
    OrderSide[OrderSide["BID"] = 1] = "BID";
})(OrderSide || (OrderSide = {}));
exports.OrderSide = OrderSide;
//# sourceMappingURL=orderEnums.js.map