import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI_ALEX);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log('connection error:', error)
    }
}