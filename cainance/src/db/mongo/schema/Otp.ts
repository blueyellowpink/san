import { Schema, model } from 'mongoose'

export type Otp = {
    userId: number
    mail: string
    phone: string
    twoFa: string
    updatedAt: number
    status: 'created' | 'solved' | 'failed'
    type: 'login' | 'register'
}

export const OtpSchema = new Schema<Otp>({
    userId: Number,
    mail: String,
    phone: String,
    twoFa: String,
    updatedAt: Number,
    status: {
        type: String,
        enum: ['created', 'solved', 'failed'],
    },
    type: {
        type: String,
        enum: ['login', 'register'],
    },
})

const Otp = model<Otp>('Otp', OtpSchema, 'otps')

export default Otp
