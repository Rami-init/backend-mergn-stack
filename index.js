const {ApolloServer} = require('apollo-server')
// const { PubSub } = require('graphql-subscriptions');
const {MONGO_URI} = require('./config.js')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/TypeDefs.js')
const resolvers = require('./resolvers/index.js')
const { PubSub } =require('graphql-subscriptions');
const pubSub = new PubSub()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>({req, pubSub})
})
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('The data server is connected !@#')
    return server.listen({port: 5000})
})
.then((res)=> console.log(`the server is listen to Port: ${res.url}`))
.catch((err)=> console.log(`the error is: ${err}`))