'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (passport) {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = _database2.default.secret;
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		_user2.default.getUserById(jwt_payload._doc._id, function (err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));
};

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = _passportJwt2.default.Strategy;
var ExtractJwt = _passportJwt2.default.ExtractJwt;