import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose'
import designRoutes from './routes/design.js'
import authRoutes from './routes/auth.js'

// setup .env and express app
dotenv.config();
const app = express()

// some middleware
app.use(express.json())
app.use(cors({ credential: true, origin: '*' }));
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

// testing purpose endpoint
app.get('/', (req, res) => {
    res.json({ msg: "Endpoint works!!!" })
})

// main endpoint
app.use('/api/design', designRoutes)
app.use('/api/auth', authRoutes)


// connect to mongo database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })