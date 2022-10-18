"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ethers = tslib_1.__importStar(require("ethers"));
const id = 1;
const wallet = ethers.Wallet.fromMnemonic('window minute second mammal diagram purse diesel damage song merit snap anchor', `m/44'/60'/0'/0/${id}`);
console.log(wallet);
//# sourceMappingURL=wallet.js.map