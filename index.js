import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose'
import designRoutes from './routes/design.js'
dotenv.config();
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})

app.get('/', (req, res) => {
    res.json({ msg: "Sukses!!!" })
})

app.get('/tes', (req, res) => {
    res.json({ msg: "Masuk tes" })
})

app.use('/api/design', designRoutes)
// app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })