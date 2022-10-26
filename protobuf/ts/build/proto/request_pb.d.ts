// package: request
// file: proto/request.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as proto_order_pb from "../proto/order_pb";

export class Add extends jspb.Message { 

    hasOrder(): boolean;
    clearOrder(): void;
    getOrder(): proto_order_pb.Order | undefined;
    setOrder(value?: proto_order_pb.Order): Add;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Add.AsObject;
    static toObject(includeInstance: boolean, msg: Add): Add.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Add, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Add;
    static deserializeBinaryFromReader(message: Add, reader: jspb.BinaryReader): Add;
}

export namespace Add {
    export type AsObject = {
        order?: proto_order_pb.Order.AsObject,
    }
}

export class Cancel extends jspb.Message { 
    getSide(): proto_order_pb.OrderSide;
    setSide(value: proto_order_pb.OrderSide): Cancel;
    getPrice(): number;
    setPrice(value: number): Cancel;
    getOrderId(): number;
    setOrderId(value: number): Cancel;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Cancel.AsObject;
    static toObject(includeInstance: boolean, msg: Cancel): Cancel.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Cancel, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Cancel;
    static deserializeBinaryFromReader(message: Cancel, reader: jspb.BinaryReader): Cancel;
}

export namespace Cancel {
    export type AsObject = {
        side: proto_order_pb.OrderSide,
        price: number,
        orderId: number,
    }
}

export class Modify extends jspb.Message { 

    hasOrder(): boolean;
    clearOrder(): void;
    getOrder(): proto_order_pb.Order | undefined;
    setOrder(value?: proto_order_pb.Order): Modify;
    getNewPrice(): number;
    setNewPrice(value: number): Modify;
    getNewAmount(): number;
    setNewAmount(value: number): Modify;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Modify.AsObject;
    static toObject(includeInstance: boolean, msg: Modify): Modify.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Modify, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Modify;
    static deserializeBinaryFromReader(message: Modify, reader: jspb.BinaryReader): Modify;
}

export namespace Modify {
    export type AsObject = {
        order?: proto_order_pb.Order.AsObject,
        newPrice: number,
        newAmount: number,
    }
}

export class Request extends jspb.Message { 

    hasAdd(): boolean;
    clearAdd(): void;
    getAdd(): Add | undefined;
    setAdd(value?: Add): Request;

    hasCancel(): boolean;
    clearCancel(): void;
    getCancel(): Cancel | undefined;
    setCancel(value?: Cancel): Request;

    hasModify(): boolean;
    clearModify(): void;
    getModify(): Modify | undefined;
    setModify(value?: Modify): Request;

    getCommandCase(): Request.CommandCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Request.AsObject;
    static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Request;
    static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
    export type AsObject = {
        add?: Add.AsObject,
        cancel?: Cancel.AsObject,
        modify?: Modify.AsObject,
    }

    export enum CommandCase {
        COMMAND_NOT_SET = 0,
        ADD = 1,
        CANCEL = 2,
        MODIFY = 3,
    }

}
