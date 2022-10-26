// package: candlestick
// file: proto/candlestick.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Candlestick extends jspb.Message { 
    getVolume(): number;
    setVolume(value: number): Candlestick;
    getOpen(): number;
    setOpen(value: number): Candlestick;
    getClose(): number;
    setClose(value: number): Candlestick;
    getHigh(): number;
    setHigh(value: number): Candlestick;
    getLow(): number;
    setLow(value: number): Candlestick;
    getTimestamp(): number;
    setTimestamp(value: number): Candlestick;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Candlestick.AsObject;
    static toObject(includeInstance: boolean, msg: Candlestick): Candlestick.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Candlestick, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Candlestick;
    static deserializeBinaryFromReader(message: Candlestick, reader: jspb.BinaryReader): Candlestick;
}

export namespace Candlestick {
    export type AsObject = {
        volume: number,
        open: number,
        close: number,
        high: number,
        low: number,
        timestamp: number,
    }
}

export class Candlesticks extends jspb.Message { 
    clearCandlesticksList(): void;
    getCandlesticksList(): Array<Candlestick>;
    setCandlesticksList(value: Array<Candlestick>): Candlesticks;
    addCandlesticks(value?: Candlestick, index?: number): Candlestick;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Candlesticks.AsObject;
    static toObject(includeInstance: boolean, msg: Candlesticks): Candlesticks.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Candlesticks, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Candlesticks;
    static deserializeBinaryFromReader(message: Candlesticks, reader: jspb.BinaryReader): Candlesticks;
}

export namespace Candlesticks {
    export type AsObject = {
        candlesticksList: Array<Candlestick.AsObject>,
    }
}
