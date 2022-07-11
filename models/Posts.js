const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    body: String,
    username: String, 
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes:[
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Post', PostSchema)