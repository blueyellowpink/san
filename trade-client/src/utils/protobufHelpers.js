"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeModifyRequest = exports.serializeCancelRequest = exports.serializeAddRequest = exports.serializeOrder = void 0;
const cainance_1 = require("cainance");
const createOrderMessage = (order) => {
    const pbOrder = new cainance_1.proto.Order();
    pbOrder.setOrderId(order.id);
    pbOrder.setUserId(order.userId);
    pbOrder.setPair(order.pair);
    pbOrder.setPrice(order.price);
    pbOrder.setAmount(order.amount);
    pbOrder.setSide(order.orderSide == 'ASK' ? cainance_1.proto.OrderSide.ASK : cainance_1.proto.OrderSide.BID);
    pbOrder.setType(order.orderType == 'LIMIT'
        ? cainance_1.proto.OrderType.LIMIT
        : cainance_1.proto.OrderType.MARKET);
    return pbOrder;
};
const serializeOrder = (order) => {
    const message = createOrderMessage(order);
    return message.serializeBinary();
};
exports.serializeOrder = serializeOrder;
const serializeAddRequest = (order) => {
    const pbOrder = createOrderMessage(order);
    const add = new cainance_1.proto.Add();
    add.setOrder(pbOrder);
    const request = new cainance_1.proto.Request();
    request.setAdd(add);
    return request.serializeBinary();
};
exports.serializeAddRequest = serializeAddRequest;
const serializeCancelRequest = (side, price, orderId) => {
    const cancel = new cainance_1.proto.Cancel();
    cancel.setSide(side == 'ASK' ? cainance_1.proto.OrderSide.ASK : cainance_1.proto.OrderSide.BID);
    cancel.setPrice(price);
    cancel.setOrderId(orderId);
    const request = new cainance_1.proto.Request();
    request.setCancel(cancel);
    return request.serializeBinary();
};
exports.serializeCancelRequest = serializeCancelRequest;
const serializeModifyRequest = (order, newPrice, newAmount) => {
    const pbOrder = createOrderMessage(order);
    const modify = new cainance_1.proto.Modify();
    modify.setOrder(pbOrder);
    modify.setNewPrice(newPrice);
    modify.setNewAmount(newAmount);
    const request = new cainance_1.proto.Request();
    request.setModify(modify);
    return request.serializeBinary();
};
exports.serializeModifyRequest = serializeModifyRequest;
//# sourceMappingURL=protobufHelpers.js.map