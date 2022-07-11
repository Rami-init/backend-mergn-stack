module.exports.validRegisterError = (username, email, password, confirmPassword)=>{
    const errors = {}
    if(username.trim() === '') {
        errors.username = 'Username must not be Empty!'
    }
    if(email.trim() === '') {
        errors.email = 'Email must not be Empty!'
    }else {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!email.match(regEx)){
            errors.email = 'Email must be valid Email Adrress'
        }
    } 
    if(password.trim() === '') {
        errors.password = 'Password must not be Empty'
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'the Password must be match'
    }
    return {
        errors, 
        valid : Object.keys(errors).length < 1
    }
}
module.exports.validLoginError = (username, password)=>{
    const errors = {}
    if(username.trim() === '') {
        errors.username = 'Username must not be Empty!'
    }
    if(password.trim() === '') {
        errors.password = 'Password must not be Empty!'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}