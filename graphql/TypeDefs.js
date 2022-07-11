const {gql} = require('graphql-tag')
module.exports = gql`
type Post {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
}
type Comment{
    id: ID!
    body: String!
    username: String!
    createdAt: String!
}
type Like {
    id: ID!
    createdAt: String!
    username: String!
}
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}
input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}
type Query{
    getPosts: [Post]
    getPost(postId: ID!): Post!
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): Post!
    createComment(postId: String!, body: String!): Comment!
    deleteComment(postId: ID!, commentId: ID!): Comment!
    likePost(postId: ID!): Like!
}
type Subscription {
    newPost: Post!
}

`