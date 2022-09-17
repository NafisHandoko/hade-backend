const Design = require('../models/DesignModel')

const getDesigns = async (req, res) => {
    const allDesigns = await Design.find().sort({createdAt: -1});
    res.json(allDesigns)
}

const getDesign = async (req, res) => {
    const { id } = req.params
    const design = await Design.findById(id)
    if(!design){
        res.status(404).json({error: 'no such design'})
    }
    res.status(200).json(design)
}

const postDesign = async (req, res) => {
    const {nama, harga, dimensi_lahan, luas_lahan, luas_bangunan} = req.body
    try{
        const designRes = await Design.create({nama, harga, dimensi_lahan, luas_lahan, luas_bangunan})
        res.status(200).json(designRes)
    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const updateDesign = async (req, res) => {
    const { id } = req.params
    const updatedDesign = await Design.findByIdAndUpdate(id, req.body)
    if(!updatedDesign){
        res.status(404).json({error: 'no such design'})
    }
    res.status(200).json(updatedDesign)
}

const deleteDesign = async (req, res) => {
    const { id } = req.params
    const deletedDesign = await Design.findByIdAndDelete(id)
    if(!deletedDesign){
        res.status(404).json({error: 'no such design'})
    }
    res.status(200).json(deletedDesign)
}

module.exports = {
    getDesigns,
    getDesign,
    postDesign,
    updateDesign,
    deleteDesign
}