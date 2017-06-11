import passportJwt from 'passport-jwt';
import User from '../models/user';
import config from '../config/database';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export default function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if(err) {
        return done(err, false);
      }
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
