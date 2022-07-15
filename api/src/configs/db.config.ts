import mongoose from 'mongoose'

export const connectToDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.log('URI not provided!')
            return
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (err) {
        console.log(err)
        return
    }
}