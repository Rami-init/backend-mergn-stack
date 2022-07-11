const Post  = require('./../models/Posts.js')
const checkAuth = require('../utils/check-auth.js')
const { AuthenticationError } = require('apollo-server')



module.exports = {
    Query: {
        getPosts: async ()=> {
            try{
                const posts = await Post.find().sort({createdAt: -1})
                return posts
            }catch(err){
                throw new Error(err);
            }
        },
        getPost: async (_, {postId})=>{
            try{
                const post = await Post.findById(postId)
                if(post) {
                    return post
                }else {
                    throw new Error('Post not Found')
                }
            }catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        createPost: async (_, {body}, context)=>{
            const user = checkAuth(context)
            const newPosts =await new Post({
                body,
                username: user.username,
                user: user.id,
                createdAt: new Date().toISOString()
            })
            const post =await newPosts.save()
             
             await context.pubSub.publish('NEW_POST',{
                newPost: post
            })
            // context.pubSub = newSub
            
            return post 
        },
        deletePost: async (_, {postId}, context)=>{
            const user = checkAuth(context)
            try{
                const post = await Post.findById(postId)
                if(user.username === post.username){
                    await post.delete()
                    return 'Successfly the Post is deleted'
                } else {
                    throw new AuthenticationError('Action not Allow')
                }
            }catch(err){
                throw new AuthenticationError(err)
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe:async(_,__,{pubSub})=>{
                pubSub.asyncIterator('NEW_POST')
                 
            }
        }
    }
}