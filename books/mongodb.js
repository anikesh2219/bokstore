const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/bookstore')
    .then(() => {
        console.log('mongodb connected')
    })
    .catch(() => {
        console.log('failed to connect')
    })

const LoginSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    publishDate: { type: Date, required: true },
})

const list = new mongoose.model("books", LoginSchema)

module.exports = list