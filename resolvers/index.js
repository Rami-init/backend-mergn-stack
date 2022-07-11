const userResolver = require('./user.js')
const postsResolver = require('./post.js')
const commentsResolver = require('./comment.js')
const likesResolver = require('./like.js')

module.exports = {
    Post: {
        likeCount: (parent)=> parent.likes.lenght ,
        commentCount: (parent)=> parent.comments.length
    },
    Query: {
    ...postsResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...postsResolver.Mutation,
        ...commentsResolver.Mutation,
        ...likesResolver.Mutation,
    },
    Subscription: {
        ...postsResolver.Subscription,
    },
}