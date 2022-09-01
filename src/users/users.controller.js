const uuid = require('uuid');
const {comparePassword, hashPassword} = require('../utils/crypt');

const userDB = [
    {
        "id": "dc1d354e-9d6f-4819-bb12-88da6ed00c80",
        "first_name": "Luis",
        "last_name": "Perez",
        "email": "Perez@example.com",
        "password": "$2b$10$/Q4q.Cb9bRdJo1EiiQhmtOGdDy5Y89O5H2QhMUZbOR4ncdo35HIAq",
        "phone": "+573004567632",
        "birthday_date": "20/11/1999",
        "country": "Chile",
        "role": "admin",
        "profile_image": "url.com/img/",
        "is_active": true,
        "verified": false 
    }
]

const getAllUsers = () =>{
    return userDB
}

const getAllUsersById=(id) =>{
    const data = userDB.filter(user => user.id === id)
    return data.length ? data[0] : false
}

const createUser = (data) => {
    const newUser = {
        id: uuid.v4(), //obligatorio
        first_name: data.first_name, // obligatorio
        last_name: data.last_name, // obligatorio
        email: data.email, // obligatorio, unico
        password: hashPassword(data.password), // obligatorio
        phone: data.phone ? data.phone : '', // obligatorio, unico
        birthday_date: data.birthday_date, // obligatorio
        country: data.country, // obligatorio
        role: 'normal', // obligatorio y por defecto "normal"
        profile_image: data.profile_image ? data.profile_image : '', 
        is_active: true, // obligatorio y por defecto "active"
        verified: false // obligatorio y por defecto "false"
    }
    userDB.push(newUser)
    return newUser;
}

const editUser = (id, data, userRole) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1) {
        userDB[index] = {
            id: id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: userDB[index].password,
            phone: data.phone ? data.phone : '',
            birthday_date: data.birthday_date,
            country: data.country,
            role: userRole === 'admin' ? data.role : 'normal',
            profile_image: data.profile_image ? data.profile_image : '',
            is_active: data.is_active,
            verified: false
        }
        return userDB[index]
    }else{
        return createUser(data)
    }

}

const deleteUser = (id) => {
    const index = userDB.findIndex(user => user.id === id)
    if(index !== -1) {
        userDB.splice(index, 1)
        return true
    }else{
        return false
    }
}

const getUserByEmail = (email) => {
    const data = userDB.filter(item => item.email === email)
    return data.length ? data[0] : false
}

const editProfileImg = (userId, imgUrl) => {
    const index = userDB.findIndex(user => user.id === userId)
    if(index !== -1) {
        userDB[index].profile_image = imgUrl
        return userDB[index]
    }
    return false
}

module.exports = {
    getAllUsers,
    getAllUsersById,
    createUser,
    editUser,
    deleteUser,
    getUserByEmail,
    editProfileImg
}