
const roleAdminMiddleware = (req, res, next) => {
    const role = req.body.role

    if (role === "admin") {
        next()
    }else {
        res.status(401).json({status: 'error', message: 'You do not have permission to make this request'})
    }
}

module.exports = roleAdminMiddleware