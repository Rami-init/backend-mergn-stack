const User = require('./../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const {SECRECTJWT} = require('../config.js')
const {UserInputError} = require('apollo-server')
const {validRegisterError, validLoginError} = require('../utils/validators.js')
const getAuth = (user)=>{
     return jwt.sign({
        id: user.id,
        username: user.username,
        eamil: user.eamil
    },
        SECRECTJWT,
        {expiresIn: '3d'},
    )
}
module.exports = {
    Mutation: {
        async register(_,{
            registerInput: {username, email, password, confirmPassword}
        }, context, info){
            //TODO valideation & hash pass token
            const {valid, errors} = validRegisterError(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', {errors})
            }
            const user = await User.findOne({username})
            if(user) {
                throw new UserInputError('this user token', {
                    errors: 'This Username Is Taken'
                })
            }
            password = await bcrypt.hash(password, 10)
            const users = new User({
                username,
                password,
                email,
                createdAt: new Date().toISOString(),
            })
            const res = await users.save()
            const token = getAuth(res)
            return {
                ...res._doc,
                id: res.id,
                token
            }
        },
        async login (_,{username, password}){
            const {valid, errors} = validLoginError(username, password)
            if(!valid){
                throw new UserInputError('Error', {errors})
            }
            const user = await User.findOne({username})
            if(!user){
                errors.general = 'user not found'
                throw new UserInputError('user not found', {errors})
            }
            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general = 'the password is Wrong'
                throw new UserInputError('the password is Wrong', {errors})
            }
            const token = getAuth(user)
            return {
                ...user._doc,
                id: user.id,
                token
            }
        }
    }
}