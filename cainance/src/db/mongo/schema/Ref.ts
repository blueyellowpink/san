import { Schema, model } from 'mongoose'

export type Ref = {
    f0Id: number
    f1Id: number
    point: number
    createdAt: number
}

export const RefSchema = new Schema<Ref>({
    f0Id: Number,
    f1Id: Number,
    point: Number,
    createdAt: Number,
})

const Ref = model<Ref>('Ref', RefSchema, 'ref')

export default Ref
