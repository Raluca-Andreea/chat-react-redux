var jwt = require('jsonwebtoken');
const generateToken = user => {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the     
  //app/collections/models
  var usr = {
    username: user.username,
    email: user.email,
    _id: user._id.toString(),
  };

  return token = jwt.sign(usr, process.env.JWT_SECRET, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });

}

const getCleanUser = user => {
  if(!user) return {};

  var usr = user.toJSON();
 
  return {
    _id: usr._id,
    username: usr.username,
    email: usr.email,   
  }
}

module.exports = {
  getCleanUser: getCleanUser,
  generateToken: generateToken
}

