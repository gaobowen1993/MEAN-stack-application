'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

var User = _mongoose2.default.model('User', UserSchema);

var getUserById = function getUserById(id, callback) {
	User.findById(id, callback);
};

var getUserByUsername = function getUserByUsername(username, callback) {
	var query = {
		username: username
	};
	User.findOne(query, callback);
};

var addUser = function addUser(newUser, callback) {
	_bcryptjs2.default.genSalt(10, function (err, salt) {
		_bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
			if (err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

var comparePassword = function comparePassword(candidatePassword, hash, callback) {
	_bcryptjs2.default.compare(candidatePassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
};

exports.default = {
	User: User,
	getUserById: getUserById,
	getUserByUsername: getUserByUsername,
	addUser: addUser,
	comparePassword: comparePassword
};