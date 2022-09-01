const {getUserByEmail} = require('../users/users.controller')
const {comparePassword} = require('../utils/crypt')


const loginUser = (email, password) =>{
    const user = getUserByEmail(email)
    if (user) {
        const verify_password = comparePassword(password, user.password)
        if (verify_password){
            return user
        }
    }
    return false
}

console.log(loginUser('Perez@example.com', 'root'))

module.exports = {
    loginUser
}