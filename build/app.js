'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('./config/database');

var _database2 = _interopRequireDefault(_database);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _passport3 = require('./config/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Connect to database
_mongoose2.default.connect(_database2.default.database);

// On Connection
_mongoose2.default.connection.on('connected', function () {
  console.log('Connected to db ' + _database2.default.database);
});

// On Error
_mongoose2.default.connection.on('error', function (err) {
  console.log('Database error ' + err);
});

var app = (0, _express2.default)();

var port = process.env.PORT;

app.use((0, _cors2.default)());

// Set static folder
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use(_bodyParser2.default.json());

// Passport middleware
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
(0, _passport4.default)(_passport2.default);

app.use('/users', _users2.default);

//index route
app.get('/', function (req, res) {
  res.send('invalid endpoint');
});

app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public/index.html'));
});

app.listen(port, function () {
  console.log("server start on port" + port);
});