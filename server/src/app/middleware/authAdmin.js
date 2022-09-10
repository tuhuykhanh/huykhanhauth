const userModel = require('../model/userModel')

const authAdmin = async (req,res,next) =>{

    try {

        const user = await userModel.findOne({_id: req.user.id})
        if(user.role !== 'admin')
            return res.status(500).json({msg:'access dinine admin'})
        next()
        
    } catch (error) {
        return res.status(500).json({ msg: error.message })   
    }

}
module.exports = authAdmin 

