const Post  = require('./../models/Posts.js')
const checkAuth = require('../utils/check-auth.js')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
    Mutation: {
        likePost: async(_, {postId}, context)=>{
            const {username} = checkAuth(context)
            const post =await Post.findById(postId)
            if(post){
                if(post.likes.find(e=> e.username === username)){
                    post.likes = post.likes.filter(e=> e.username !== username)
                }else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString(),
                    })
                }
                await post.save()
                return post
                
            }else {
                throw new UserInputError('the post not found')
            }
        }
    }
}