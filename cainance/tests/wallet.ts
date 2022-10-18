import * as ethers from 'ethers'

const id = 1
const wallet = ethers.Wallet.fromMnemonic(
    'window minute second mammal diagram purse diesel damage song merit snap anchor',
    `m/44'/60'/0'/0/${id}`
)
console.log(wallet)
