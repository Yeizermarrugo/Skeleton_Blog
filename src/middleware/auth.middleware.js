const {getAllUsersById} = require('../users/users.controller')

const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: "academlo"
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {
            const data = getAllUsersById(decoded.id)

            if(data){
                console.log("decoded jwt", decoded)
                return done(null, decoded)
            }else {
                return done(null, false)
            }
        })
    )
};