const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    auth: {
        type: String, 
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)