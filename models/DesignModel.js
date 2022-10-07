import mongoose from 'mongoose'
const Schema = mongoose.Schema

const designSchema = Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    land_dimension: {
        type: String,
        required: true
    },
    land_area: {
        type: Number,
        required: true
    },
    building_area: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    design_style: {
        type: Number,
        required: true
    },
    design_category: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Design', designSchema)