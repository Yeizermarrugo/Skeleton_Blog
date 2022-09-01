const router = require('express').Router()
const passport = require('passport')
const userService = require('./user.http')
const postService = require('../posts/post.http')
const roleAdminMiddleware = require('../middleware/adminRole')
const {upload} = require('../utils/multer')
require('../middleware/auth.middleware')
router.route('/')
    .get(userService.getAll)
    .post(userService.register)

router.route('/me')
    .get(passport.authenticate('jwt', {session: false}), userService.getMyUserById)
    .put(passport.authenticate('jwt', {session: false}), userService.editMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userService.removeMyUser)

router.get(("/me/posts"), passport.authenticate("jwt", {session: false}), postService.getAllPostUser)
    
router.route("/me/posts/:id")
      .get(passport.authenticate("jwt", {session: false}), postService.getPostByUserId)
      .put(passport.authenticate("jwt", {session: false}), postService.editPostByUser)
      .delete(passport.authenticate("jwt", {session: false}), postService.removePostByUser)


router.route('/me/profile-img')
     .post(passport.authenticate('jwt', {session: false}), upload.single('profile-img'), userService.postProfileImg)

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), userService.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userService.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userService.edit)

module.exports = {
    router
}