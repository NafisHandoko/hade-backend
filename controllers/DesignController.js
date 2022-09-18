import Design from '../models/DesignModel.js'

export const getDesigns = async (req, res) => {
    const allDesigns = await Design.find().sort({createdAt: -1});
    res.json(allDesigns)
}

export const getDesign = async (req, res) => {
    const { id } = req.params
    const design = await Design.findById(id)
    if(!design){
        res.status(404).json({error: 'no such design'})
    }
    res.status(200).json(design)
}

export const postDesign = async (req, res) => {
    const {name, price, land_dimension, land_area, building_area, design_style, design_category} = req.body
    try{
        const designRes = await Design.create({name, price, land_dimension, land_area, building_area, rating:0, design_style, design_category})
        res.status(200).json(designRes)
    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

export const updateDesign = async (req, res) => {
    const { id } = req.params
    const updatedDesign = await Design.findByIdAndUpdate(id, req.body)
    if(!updatedDesign){
        res.status(404).json({error: 'no such design'})
    }
    res.status(200).json(updatedDesign)
}

export const deleteDesign = async (req, res) => {
    const { id } = req.params
    const deletedDesign = await Design.findByIdAndDelete(id)
    if(!deletedDesign){
        res.status(404).json({error: 'no such design'})
    }
    res.status(200).json(deletedDesign)
}

// module.exports = {
//     getDesigns,
//     getDesign,
//     postDesign,
//     updateDesign,
//     deleteDesign
// }