const router = require('express').Router()

const authService = require('./auth.http')

router.post('/login', authService.login)

exports.router = router