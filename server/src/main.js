require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')






app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

//connect mongodb
const URI = process.env.MONGO_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if(err) throw err
    console.log('connected')
})

//router 
router(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`app listen port ${PORT}`)
})