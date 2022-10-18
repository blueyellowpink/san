import SpotWallet from './schema/Wallet'
import Chain from './schema/Chain'
import Keypair from './schema/Keypair'
import Token from './schema/Token'
import Otp from './schema/Otp'
import mongoose from 'mongoose'
import UserRefCode from './schema/UserRefCode'
import Ref from './schema/Ref'

const connect = async (uri: string): Promise<void> => {
    await mongoose.connect(uri)
}

export default {
    connect,
    SpotWallet,
    Chain,
    Keypair,
    Token,
    Otp,
    UserRefCode,
    Ref,
}
