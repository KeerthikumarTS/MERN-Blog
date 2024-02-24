import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>(console.log('MongoDB connected')))
.catch((err) => (console.log(err)))

app.use('/api/v1', userRoutes)
app.use('/api/v1', authRoutes)

app.listen(3000, () => {
    console.log('Server is running on the port: 3000')
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Sever Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})