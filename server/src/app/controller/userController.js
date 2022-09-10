const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { CLIENT_URL } = process.env
const sendMail = require('../../config/sendMail')

const userController = {

    register: async (req, res) => {
        try {

            const { username, password, email } = req.body

            if (!username || !password || !email) {
                return res.status(400).json({ msg: 'please enter all field' })
            }
            if (!validateEmail(email))
                return res.status(400).json({ msg: 'invalid email!' })
            const user = await userModel.findOne({ email })
            if (user)
                return res.status(400).json({ msg: 'this email already exists' })
            if (password.length < 6)
                return res.status(400).json({ msg: 'password length must be longer than 6 character' })
            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                username,
                email,
                password: passwordHash
            }
            console.log(newUser)
            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/account/activation/${activation_token}`

            sendMail(email, url, 'verify your email address')

            res.json({ msg: 'register success!, check your email!' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }

    },
    activeEmailAccount: async (req, res) => {
        try {

            const { activation_token } = req.body

            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { username, email, password } = user

            const check = await userModel.findOne({ email: email })
            if (check)
                return res.status(400).json({ msg: 'this email already exists' })

            const newUser = new userModel({
                username: username,
                email: email,
                password: password,
            })
            await newUser.save();

            res.json({ msg: 'register account success!' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    login: async (req, res) => {
        try {

            const { email, password } = req.body

            const user = await userModel.findOne({ email })
            if (!user)
                return res.status(400).json({ msg: 'email dose not exists!' })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ msg: 'password incorrect !' })

            const refresh_token = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/account/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000   
            })

            res.json({ msg: 'login success' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAccessToken: async (req, res) => {

        try {
            const rq_token = req.cookies.refreshtoken
            if (!rq_token) return res.status(400).json({ msg: 'please login' })

            jwt.verify(rq_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: 'please login' })

                const access_token = createAccessToken({ id: user.id })

                res.json({  access_token })
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body

            const user = await userModel.findOne({ email })

            if (!user)
                res.status(400).json({ msg: 'email dose not exists' })

            const access_token = createAccessToken({ id: user.id })

            const url = `${CLIENT_URL}/account/reset/${access_token}`

            sendMail(email, url, 'reset your password')

            res.json({ msg: 're-send password - please check your email' })


        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    resetPassword: async (req, res) => {
        try {

            const { newpassword } = req.body

            const newPassWordHash = await bcrypt.hash(newpassword, 12)

            const id = req.user.id

            await userModel.findOneAndUpdate({ _id: id }, {
                password: newPassWordHash
            })

            res.json({ msg: 'password has been changed' })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getInfoUser: async (req,res)=>{
        try {
            const user = await userModel.findOne({_id: req.user.id})
            res.json(user)
            
        } catch (error) {
            return res.status(500).json({ msg: error.message })
            
        }
    },
    getAllInfoUser: async (req,res)=>{
        try {

            const users  = await userModel.find().select(['-password'])

            res.json(users)

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logOut:  async (req,res )=>{
        try {

            res.clearCookie('refreshtoken',{path: '/account/refresh_token'})
            return res.json({msg: 'logged out.'})

        } catch (error) {
            return res.status(500).json({ msg: error.message })  
        }
    },
    updateUser: async(req,res)=>{
        try {

            const { username, avatar } = req.body

            await userModel.findByIdAndUpdate({_id: req.user.id},{
                username,
                avatar
            })

            res.json({msg:'update successfull!'})
            
        } catch (error) {
            return res.status(500).json({ msg: error.message })         
        }
    },
    updateUserRole: async (req,res)=>{

        try {

            const { role } = req.body

            await userModel.findByIdAndUpdate({_id: req.params.id},{
                role
            })
            res.json({msg:'update role success'})
           
        } catch (error) {

            return res.status(500).json({ msg: error.message })   

        }
    },
    deleteUser: async(req,res)=>{
        try {
            
            await userModel.findByIdAndDelete({_id:req.params.id})
            res.json({msg: 'delete success'})

        } catch (error) {
            return res.status(500).json({ msg: error.message })   
        }
    }
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

module.exports = userController;