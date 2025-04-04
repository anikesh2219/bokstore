const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/bookstore')
.then(()=>{
    console.log('mongoDb connected')
})
.catch(()=>{
    console.log('failed to connect')
})

const LoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const account = new mongoose.model("User", LoginSchema)

module.exports= account