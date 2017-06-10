import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/database';

const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required:true
	},
	username: {
		type:String,
		required:true
	},
	password: {
		type: String,
		required:true
	}
});

const User = mongoose.model('User', UserSchema);

const getUserById = (id, callback) => {
	User.findById(id, callback);
};

const getUserByUsername = (username, callback) => {
	const query = {
		username: username
	}
	User.findOne(query, callback);
};

const addUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if(err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

const comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
};

export default {
	User,
	getUserById,
	getUserByUsername,
	addUser,
	comparePassword 
};