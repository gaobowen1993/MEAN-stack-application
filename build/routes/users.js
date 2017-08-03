'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _registerUser = require('../modules/register-user');

var _registerUser2 = _interopRequireDefault(_registerUser);

var _authenticateUser = require('../modules/authenticate-user');

var _authenticateUser2 = _interopRequireDefault(_authenticateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Register
router.post('/register', _registerUser2.default);

// Authenticate
router.post('/authenticate', _authenticateUser2.default);

// Profile
router.get('/profile', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
  res.json({
    user: req.user
  });
});

exports.default = router;