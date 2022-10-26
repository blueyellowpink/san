// package: orderbook
// file: proto/orderbook.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class OrderBook extends jspb.Message { 
    clearAskPairsList(): void;
    getAskPairsList(): Array<PriceSizePair>;
    setAskPairsList(value: Array<PriceSizePair>): OrderBook;
    addAskPairs(value?: PriceSizePair, index?: number): PriceSizePair;
    clearBidPairsList(): void;
    getBidPairsList(): Array<PriceSizePair>;
    setBidPairsList(value: Array<PriceSizePair>): OrderBook;
    addBidPairs(value?: PriceSizePair, index?: number): PriceSizePair;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OrderBook.AsObject;
    static toObject(includeInstance: boolean, msg: OrderBook): OrderBook.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OrderBook, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OrderBook;
    static deserializeBinaryFromReader(message: OrderBook, reader: jspb.BinaryReader): OrderBook;
}

export namespace OrderBook {
    export type AsObject = {
        askPairsList: Array<PriceSizePair.AsObject>,
        bidPairsList: Array<PriceSizePair.AsObject>,
    }
}

export class PriceSizePair extends jspb.Message { 
    getPrice(): number;
    setPrice(value: number): PriceSizePair;
    getSize(): number;
    setSize(value: number): PriceSizePair;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PriceSizePair.AsObject;
    static toObject(includeInstance: boolean, msg: PriceSizePair): PriceSizePair.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PriceSizePair, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PriceSizePair;
    static deserializeBinaryFromReader(message: PriceSizePair, reader: jspb.BinaryReader): PriceSizePair;
}

export namespace PriceSizePair {
    export type AsObject = {
        price: number,
        size: number,
    }
}
