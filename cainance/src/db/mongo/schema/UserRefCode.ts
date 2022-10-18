import { Schema, model } from 'mongoose'

export type UserRefCode = {
    userId: number
    refCode: string
}

export const UserRefCodeSchema = new Schema<UserRefCode>({
    userId: Number,
    refCode: String,
})

const UserRefCode = model<UserRefCode>(
    'UserRefCode',
    UserRefCodeSchema,
    'userRefCodes'
)

export default UserRefCode
