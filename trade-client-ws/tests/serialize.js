"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msgpack_1 = require("@msgpack/msgpack");
const a = {
    side: 1,
    price: 400.5555,
    amount: 1000.555,
    timestamp: 1649596198047,
};
const obj = [];
for (let i = 0; i < 30; i++) {
    obj.push(a);
}
const jsonBuf = Buffer.from(JSON.stringify(obj)).length;
console.log({ jsonBuf });
const msgBuf = Buffer.from((0, msgpack_1.encode)(obj)).length;
console.log({ msgBuf });
//# sourceMappingURL=serialize.js.map