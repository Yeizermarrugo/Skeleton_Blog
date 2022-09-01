const userController = require('./users.controller')

const getAll = (req, res) => {
    const data = userController.getAllUsers()
    res.status(200).json({
        items: data.length,
        users: data
    })
}

const getById = (req, res) => {
    const id = req.params.id
    const data = userController.getAllUsersById(id)
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: `El usuario con el id ${id} no existe`})
    }
}

const register = (req, res) => {
    const data = req.body
    if(!data){ 
        return res.status(400).json({message: 'Missing data'})
    }else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.birthday_date ||
        !data.country
    ){
        return res.status(400).json({message: 'All fields must be completed', fields:{
            first_name: 'string',
            last_name: 'string',
            email: 'example@example.com',
            password: 'string',
            birthday_date: 'DD/MM/YYYY',
            country: 'string'
        }})
    }else {
        const response = userController.createUser(data)
            return res.status(201).json({
                message: `User created succesfully with id: ${response.id}`,
                user: response
            })
    }
}

const remove = (req, res) => {
    const id= req.params.id
    const data = userController.deleteUser(id)
    if(data){
        return res.status(204).json()
    }else{
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const edit = (req, res) => {
    const id = req.params.id
    const data= req.body
    if(!Object.keys(data).length){
        return res.status(404).json({message: 'Missing data'})
    }else if(
        !data.first_name ||
        !data.last_name ||
        !data.email || 
        !data.password||
        !data.phone||
        !data.birthday_date ||
        !data.country||
        !data.role ||
        !data.profile_image||
        !data.is_active
    ){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            first_name: 'string',
            last_name: 'string',
            email: 'example@example.com',
            password: 'string',
            phone: 'string',
            birthday_date: 'DD/MM/YYYY',
            country: 'string',
            role: 'string',
            profile_image: 'example.com/img/example.png',
            is_active: true
        }})
    }else{
        const response = userController.editUser(id, data)
        return res.status(200).json({
            message: 'User edited succesfully',
            user: response
        })
    }
}

//!--------------------- Rutas Protegidas -------------------//

const getMyUserById = (req, res) => {
    const id = req.user.id
    console.log(id)
    const data = userController.getAllUsersById(id)
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: `User id ${id} not found`})
    }
}

const removeMyUser = (req, res) => {
    const id = req.user.id
    const data = userController.deleteUser(id)
    if(data){
        return res.status(204).json()
    }else{
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const editMyUser = (req, res) => {
    const id = req.user.id
    const data = req.body
    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing data'})
    }else if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.phone ||
        !data.birthday_date ||
        !data.country ||
        !data.profile_image ||
        !data.is_active
    ){
        return res.status(400).json({message: 'All fields must be completed', fields: {
            first_name: 'string',
            last_name: 'string',
            email: 'example@example.com',
            password: 'string',
            phone: 'string',
            birthday_date: 'DD/MM/YYYY',
            country: 'string',
            profile_image: 'example.com/img/example.png',
            is_active: true
        }})
    }else{
        const response = userController.editUser(id, data)
        return res.status(200).json({
            message: 'User successfully updated',
            user: response
        })
    }
}

const postProfileImg = (req, res) => {
    const userId = req.user.id
    //localhost:8080/api/v1/users/me/profile_img

    const imgPath = req.hostname + ':8080' + '/api/v1/uploads/' + req.file.filename
    const data = userController.editProfileImg(userId, imgPath)
    res.status(200).json(data)
}

module.exports = {
    getAll,
    getById,
    register,
    edit,
    remove,
    getMyUserById,
    editMyUser,
    removeMyUser,
    postProfileImg
}