const jwt = require('jsonwebtoken')
const {loginUser} = require('./auth.controller')

const login = (req, res) => {
    const data = req.body

    if (!data.email || !data.password) {
        return res.status(400).json({message: 'Missing data'})
    }

    const response = loginUser(data.email, data.password)

    if (response){
        const token = jwt.sign({
            id: response.id,
            email: response.email,
            role: response.role
        }, 'academlo')
        return res.status(200).json({message: 'Tus credenciales son correctas', token})
    }else {
        return res.status(401).json({message: 'Invalid credentials'})
    }
}

module.exports = {
    login
}