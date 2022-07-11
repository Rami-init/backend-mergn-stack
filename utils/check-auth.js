const {AuthenticationError}= require('apollo-server')
const jwt = require('jsonwebtoken')
const {SECRECTJWT} = require('../config.js')

module.exports = (context)=>{
    const authheader = context.req.headers.authorization
    if(authheader){
        const token = authheader.split('Bearer ')[1]
        if(token){
            try{
                const user = jwt.verify(token, SECRECTJWT)
                return user
            }catch(err){
                throw new AuthenticationError('the token is expired')
            }
        }
        throw new AuthenticationError('the token must be valid')
    }
    throw new AuthenticationError('auth header must be provide')
}