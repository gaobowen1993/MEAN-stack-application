import User from '../models/user';

export default(req, res) => {
  const newUser = new User.User({
    name: req.body.name,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Faile to register user'});
    } else {
      res.json({success:true, msg: 'success to register user'});
    }
  });
}