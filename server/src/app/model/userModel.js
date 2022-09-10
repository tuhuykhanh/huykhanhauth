const mongoose = require('mongoose')

const useSchema = mongoose.Schema({

    username: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type:String,
        require: true,
        trim: true,
        unique:true,
    },
    password: {
        type:String,
        require: true,
    },
    role: {
        type: String,
        default: 'customer'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/huykhanh/image/upload/v1648626683/samples/sheep.jpg',
    }

}, { timestamps: true });


module.exports = mongoose.model('users',useSchema)