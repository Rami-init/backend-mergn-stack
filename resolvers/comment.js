const Post  = require('./../models/Posts.js')
const checkAuth = require('../utils/check-auth.js')
const { AuthenticationError } = require('apollo-server')
const { UserInputError } = require('apollo-server')

module.exports = {
    Mutation: {
        createComment: async (_, {postId, body}, context)=>{
            const {username} = checkAuth(context)
            if(body.trim() === ''){
                throw new UserInputError('Empty Comment', {
                    errors: {
                        body: 'the comment must not be empty'
                    }
                })
            } else {
                const post =await Post.findById(postId)
                if(post){ 
                    await post.comments.unshift({
                        body,
                        username,
                        createAt: new Date().toISOString()
                    })
                    await post.save()
                    return post

                }else {
                    throw new UserInputError("the PostID not Found", {
                        errors: {
                            body: 'the auth of Post id must be found'
                        }
                    })
                }
            }
        },
        deleteComment: async (_, {postId, commentId}, context)=>{
            const user = checkAuth(context)
            const post =await Post.findById(postId)
            if(post){
                const commentIndex =await post.comments.findIndex(c=> c.id = commentId)
                if(post.comments[commentIndex].username === user.username) {
                    await post.comments.splice(commentIndex, 1)
                    await post.save()
                    return post
                }else {
                    throw new AuthenticationError('action not allowed')
                }
            }else {
                throw new UserInputError('the post not Found')
            }
        }
    },
}