import { proto } from 'cainance';

const createOrderMessage = (order): proto.Order => {
    const pbOrder = new proto.Order();
    pbOrder.setOrderId(order.id);
    pbOrder.setUserId(order.userId);
    pbOrder.setPair(order.pair);
    pbOrder.setPrice(order.price);
    pbOrder.setAmount(order.amount);
    pbOrder.setSide(
        order.orderSide == 'ASK' ? proto.OrderSide.ASK : proto.OrderSide.BID
    );
    pbOrder.setType(
        order.orderType == 'LIMIT'
            ? proto.OrderType.LIMIT
            : proto.OrderType.MARKET
    );
    return pbOrder;
};

export const serializeOrder = (order): Uint8Array => {
    const message = createOrderMessage(order);
    return message.serializeBinary();
};

export const serializeAddRequest = (order): Uint8Array => {
    const pbOrder = createOrderMessage(order);

    const add = new proto.Add();
    add.setOrder(pbOrder);

    const request = new proto.Request();
    request.setAdd(add);

    return request.serializeBinary();
};

export const serializeCancelRequest = (
    side: string,
    price: number,
    orderId: number
): Uint8Array => {
    const cancel = new proto.Cancel();
    cancel.setSide(side == 'ASK' ? proto.OrderSide.ASK : proto.OrderSide.BID);
    cancel.setPrice(price);
    cancel.setOrderId(orderId);

    const request = new proto.Request();
    request.setCancel(cancel);

    return request.serializeBinary();
};

export const serializeModifyRequest = (
    order: any,
    newPrice: number,
    newAmount: number
): Uint8Array => {
    const pbOrder = createOrderMessage(order);

    const modify = new proto.Modify();
    modify.setOrder(pbOrder);
    modify.setNewPrice(newPrice);
    modify.setNewAmount(newAmount);

    const request = new proto.Request();
    request.setModify(modify);

    return request.serializeBinary();
};
