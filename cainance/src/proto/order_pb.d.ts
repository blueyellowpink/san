// package: order
// file: proto/order.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Order extends jspb.Message { 
    getOrderId(): number;
    setOrderId(value: number): Order;
    getUserId(): number;
    setUserId(value: number): Order;
    getAllowance(): number;
    setAllowance(value: number): Order;
    getPair(): string;
    setPair(value: string): Order;
    getPrice(): number;
    setPrice(value: number): Order;
    getAmount(): number;
    setAmount(value: number): Order;
    getSide(): OrderSide;
    setSide(value: OrderSide): Order;
    getType(): OrderType;
    setType(value: OrderType): Order;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Order.AsObject;
    static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Order;
    static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
    export type AsObject = {
        orderId: number,
        userId: number,
        allowance: number,
        pair: string,
        price: number,
        amount: number,
        side: OrderSide,
        type: OrderType,
    }
}

export enum OrderSide {
    ASK = 0,
    BID = 1,
}

export enum OrderType {
    LIMIT = 0,
    MARKET = 1,
    STOP_LIMIT = 2,
    OCO = 3,
}
