import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
export const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    const role = user.role

    res.status(200).json({email, role, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
export const signupUser = async (req, res) => {
  const {email, password, role} = req.body

  try {
    if(role===1){
      throw Error('you are not authorized to signup as admin')
    }
    const user = await User.signup(email, password, role)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, role, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}