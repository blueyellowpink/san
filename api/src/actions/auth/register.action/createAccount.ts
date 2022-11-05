import mongoose, { Document } from 'mongoose'
import { CainanceSequel, models } from '@cainance/db'
import md5 from 'md5'
import createRandomString from '../../../libs/random/createRandomString'
import { Wallet as EvmKeypair } from 'ethers'
import { Keypair as SolanaKeypair } from '@solana/web3.js'
import config from '../../../globalConfig'

const createSpotWallet = async (accountId: string): Promise<void> => {
    try {
        const tokens = await models.Token.find().select('symbol').lean()
        if (!tokens || tokens.length == 0) {
            throw new Error('createSpotWallet failed: no tokens')
        }

        const wallets = tokens.map(token => {
            return {
                accountId,
                token: token.symbol,
            }
        })

        await CainanceSequel.SpotWallet.bulkCreate(wallets)
    } catch (error) {
        throw new Error('createSpotWallet failed: ' + error.message)
    }
}

const createKeypair = (chainType: string) => {
    if (chainType === 'evm') {
        const keypair = EvmKeypair.fromMnemonic(
            config.evmMnemonic,
            `m/44'/60'/0'/0/1`
        )
        return {
            publicKey: keypair.address,
            privateKey: keypair.privateKey,
        }
    }

    if (chainType === 'solana') {
        const keypair = SolanaKeypair.generate()
        return {
            publicKey: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey).toString('base64'),
        }
    }
}

const createRefCode = async generatedCodes => {
    let code = createRandomString().toUpperCase()
    while (generatedCodes.includes(code)) {
        code = createRandomString().toUpperCase()
    }
    const refCode = code

    const sameRefCodeAccount = await models.user
        .findOne({ refCode: refCode })
        .select('_id')

    if (sameRefCodeAccount) return createRefCode([...generatedCodes, refCode])

    return refCode
}

const createAccount = async ({ email, password }) => {
    const refCode = await createRefCode([])

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const newAccount = await models.user.create(
            [
                {
                    email: email,
                    password: md5(password),
                    refCode: refCode,
                    keypair: {
                        evm: createKeypair('evm'),
                        solana: createKeypair('solana'),
                    },
                },
            ],
            { session: session }
        )

        await createSpotWallet(newAccount[0]._id.toString())

        await session.commitTransaction()
        await session.endSession()

        return newAccount[0]
    } catch (err) {
        await session.abortTransaction()
        await session.endSession()

        throw new Error('createAccount failed: ' + err.message)
    }
}

export default createAccount
