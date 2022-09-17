const mongoose = require('mongoose')
const Schema = mongoose.Schema

const designSchema = Schema({
    nama: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    dimensi_lahan: {
        type: String,
        required: true
    },
    luas_lahan: {
        type: Number,
        required: true
    },
    luas_bangunan: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Design', designSchema)