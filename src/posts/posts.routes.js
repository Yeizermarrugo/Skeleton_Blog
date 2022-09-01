const router = require('express').Router()
const passport = require('passport')
const postService = require('./post.http')


router.route('/')
    .get(postService.getAll)
    .post(passport.authenticate('jwt', {session: false}), postService.register)


router.route('/:id')
    .get(postService.getAll)
    

module.exports = {
    router
}