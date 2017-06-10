'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
  var newUser = new _user2.default.User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  _user2.default.addUser(newUser, function (err, user) {
    if (err) {
      res.json({ success: false, msg: 'Faile to register user' });
    } else {
      res.json({ success: true, msg: 'success to register user' });
    }
  });
};