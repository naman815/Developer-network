const JwtStrategy = require("passport-jwt").Strategy;
const ExtraxtJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Users = mongoose.model("users");
const keys = require("../config/keys");
const opts = {};

opts.jwtFromRequest = ExtraxtJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Users.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
