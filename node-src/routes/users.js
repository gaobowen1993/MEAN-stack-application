import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/database';
import User from '../models/user';
import registerUser from '../modules/register-user';
import authenticateUser from '../modules/authenticate-user';

const router = express.Router();

// Register
router.post('/register', registerUser);

// Authenticate
router.post('/authenticate', authenticateUser);

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({
    user:req.user
  });
});

export default router;