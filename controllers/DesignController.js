import Design from '../models/DesignModel.js'
import mongoose from 'mongoose'

export const getDesigns = async (req, res) => {
    // const allDesigns = await Design.find().sort({ createdAt: -1 });
    const allDesigns = await Design.aggregate([
        {
            $lookup: {
                from: "design_styles",
                localField: "design_style",
                foreignField: "id",
                pipeline: [{ $project: { style: 1, _id: 0 } }],
                as: "design_style",
            },
        },
        {
            $lookup: {
                from: "design_categories",
                localField: "design_category",
                foreignField: "id",
                pipeline: [{ $project: { category: 1, _id: 0 } }],
                as: "design_category",
            },
        },
        {
            $unwind: "$design_style"
        },
        {
            $unwind: "$design_category"
        },
        {
            $addFields: {
                design_style: "$design_style.style",
            }
        },
        {
            $addFields: {
                design_category: "$design_category.category",
            }
        },
        {
            $sort: {createdAt: -1}
        }
    ])
    res.json(allDesigns)
}

export const getDesign = async (req, res) => {
    const { id } = req.params
    // const design = await Design.findById(id)
    const design = await Design.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "design_styles",
                localField: "design_style",
                foreignField: "id",
                pipeline: [{ $project: { style: 1, _id: 0 } }],
                as: "design_style",
            },
        },
        {
            $lookup: {
                from: "design_categories",
                localField: "design_category",
                foreignField: "id",
                pipeline: [{ $project: { category: 1, _id: 0 } }],
                as: "design_category",
            },
        },
        {
            $unwind: "$design_style"
        },
        {
            $unwind: "$design_category"
        },
        {
            $addFields: {
                design_style: "$design_style.style",
            }
        },
        {
            $addFields: {
                design_category: "$design_category.category",
            }
        }
    ])
    if (!design) {
        res.status(404).json({ error: 'no such design' })
    }
    res.status(200).json(design)
}

export const postDesign = async (req, res) => {
    const { name, price, land_dimension, land_area, building_area, design_style, design_category } = req.body
    try {
        const designRes = await Design.create({ name, price, land_dimension, land_area, building_area, rating: 0, design_style, design_category })
        res.status(200).json(designRes)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}

export const updateDesign = async (req, res) => {
    const { id } = req.params
    const updatedDesign = await Design.findByIdAndUpdate(id, req.body)
    if (!updatedDesign) {
        res.status(404).json({ error: 'no such design' })
    }
    res.status(200).json(updatedDesign)
}

export const deleteDesign = async (req, res) => {
    const { id } = req.params
    const deletedDesign = await Design.findByIdAndDelete(id)
    if (!deletedDesign) {
        res.status(404).json({ error: 'no such design' })
    }
    res.status(200).json(deletedDesign)
}
