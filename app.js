const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
	console.log('connected to db '+config.database);
});

mongoose.connection.on('error', (err) => {
	console.log('database error '+err);
});

const app = express();

const users = require('./routes/users');

// port number
const port = 3000;

app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

//index route
app.get('/', (req, res) => {
	res.send('invalid endpoint');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
app.listen(port, () => {
	console.log("server start on port"+port);
});