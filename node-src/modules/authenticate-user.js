import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config/database';

export default (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success:false, msg: 'user not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user:{
            id: user._id,
            name:user.name,
            username:user.username,
            email:user.email
          }
        });
      } else {
        return res.json({success:false, msg: 'Wrong password'});
      }
    });
  });
}