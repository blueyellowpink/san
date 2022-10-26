// package: tick
// file: proto/tick.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Tick extends jspb.Message { 
    getPrice(): number;
    setPrice(value: number): Tick;
    getAmount(): number;
    setAmount(value: number): Tick;
    getTimestamp(): number;
    setTimestamp(value: number): Tick;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tick.AsObject;
    static toObject(includeInstance: boolean, msg: Tick): Tick.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Tick, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Tick;
    static deserializeBinaryFromReader(message: Tick, reader: jspb.BinaryReader): Tick;
}

export namespace Tick {
    export type AsObject = {
        price: number,
        amount: number,
        timestamp: number,
    }
}

export class Ticks extends jspb.Message { 
    clearTicksList(): void;
    getTicksList(): Array<Tick>;
    setTicksList(value: Array<Tick>): Ticks;
    addTicks(value?: Tick, index?: number): Tick;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Ticks.AsObject;
    static toObject(includeInstance: boolean, msg: Ticks): Ticks.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Ticks, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Ticks;
    static deserializeBinaryFromReader(message: Ticks, reader: jspb.BinaryReader): Ticks;
}

export namespace Ticks {
    export type AsObject = {
        ticksList: Array<Tick.AsObject>,
    }
}
