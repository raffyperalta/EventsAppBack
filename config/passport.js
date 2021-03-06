const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require('../models');

const Users = models.User;

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'myVerySecret';

module.exports = passport => {

  passport.use(new JwtStrategy(

  jwtOptions,(jwt_payload,done) => {

      Users.findOne({
        where:{
        id:jwt_payload.id
        }
      })
      .then(user => {
        console.log(user); console.log(jwt_payload);
        if(user){
          return done(null, user)
        }
        return done (null, false);
      })
      .catch(err => console.log(err));
    }
  ))
}