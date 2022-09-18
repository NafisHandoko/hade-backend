import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose'
import designRoutes from './routes/design.js'
import authRoutes from './routes/auth.js'
dotenv.config();
const app = express()

app.use(express.json())
app.use(cors({ credential: true, origin: '*' }));
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.get('/', (req, res) => {
    res.json({ msg: "Endpoint works!!!" })
})

app.use('/api/design', designRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })