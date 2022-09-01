const express = require('express');
const passport = require('passport');
require('./middleware/auth.middleware')(passport)
require('dotenv').config()

const port = process.env.PORT
const path = require('path')

const userRoute = require('./users/user.routes').router
const authRoute = require('./auth/auth.routes').router
const postRoute = require('./posts/posts.routes').router
const app = express();


app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'All ok!'})
})

app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)

app.get('/api/v1/uploads/:imgName', (req, res) => {
    const imgName = req.params.imgName
    res.status(200).sendFile(path.resolve('uploads/' + '/' + imgName))
})

app.listen(port, ()=> {
    console.log(`Server started at port: ${port}`)
})

module.exports ={
    app
}