// package: trade
// file: proto/trade.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as proto_order_pb from "../proto/order_pb";

export class Trade extends jspb.Message { 
    getInitSide(): proto_order_pb.OrderSide;
    setInitSide(value: proto_order_pb.OrderSide): Trade;
    getInitType(): proto_order_pb.OrderType;
    setInitType(value: proto_order_pb.OrderType): Trade;
    clearTradesList(): void;
    getTradesList(): Array<MatchedPair>;
    setTradesList(value: Array<MatchedPair>): Trade;
    addTrades(value?: MatchedPair, index?: number): MatchedPair;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Trade.AsObject;
    static toObject(includeInstance: boolean, msg: Trade): Trade.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Trade, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Trade;
    static deserializeBinaryFromReader(message: Trade, reader: jspb.BinaryReader): Trade;
}

export namespace Trade {
    export type AsObject = {
        initSide: proto_order_pb.OrderSide,
        initType: proto_order_pb.OrderType,
        tradesList: Array<MatchedPair.AsObject>,
    }
}

export class MatchedPair extends jspb.Message { 
    getPrice(): number;
    setPrice(value: number): MatchedPair;

    hasInitOrder(): boolean;
    clearInitOrder(): void;
    getInitOrder(): MatchedOrder | undefined;
    setInitOrder(value?: MatchedOrder): MatchedPair;
    clearMatchedOrdersList(): void;
    getMatchedOrdersList(): Array<MatchedOrder>;
    setMatchedOrdersList(value: Array<MatchedOrder>): MatchedPair;
    addMatchedOrders(value?: MatchedOrder, index?: number): MatchedOrder;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MatchedPair.AsObject;
    static toObject(includeInstance: boolean, msg: MatchedPair): MatchedPair.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MatchedPair, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MatchedPair;
    static deserializeBinaryFromReader(message: MatchedPair, reader: jspb.BinaryReader): MatchedPair;
}

export namespace MatchedPair {
    export type AsObject = {
        price: number,
        initOrder?: MatchedOrder.AsObject,
        matchedOrdersList: Array<MatchedOrder.AsObject>,
    }
}

export class MatchedOrder extends jspb.Message { 
    getOrderId(): number;
    setOrderId(value: number): MatchedOrder;
    getAccountId(): string;
    setAccountId(value: string): MatchedOrder;
    getAmount(): number;
    setAmount(value: number): MatchedOrder;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MatchedOrder.AsObject;
    static toObject(includeInstance: boolean, msg: MatchedOrder): MatchedOrder.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MatchedOrder, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MatchedOrder;
    static deserializeBinaryFromReader(message: MatchedOrder, reader: jspb.BinaryReader): MatchedOrder;
}

export namespace MatchedOrder {
    export type AsObject = {
        orderId: number,
        accountId: string,
        amount: number,
    }
}
