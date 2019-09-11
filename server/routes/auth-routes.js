const express = require('express');
const authRoutes = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//jwt-token
const utils = require('../configs/jwt');
const expressJwt = require('express-jwt');

if (!process.env.JWT_SECRET) {
    console.error('ERROR!: Please set JWT_SECRET before running the app. \n run: export JWT_SECRET=<some secret string> to set JWTSecret. ')
    process.exit();
  }

authRoutes.post('/signup', (req, res, next) => {

  const { username, email, password } = req.body
  if (!email || !password || !username) { res.status(400).json({ message: 'Provide email, password and username' }); return; }
  if (password.length < 5) {
      res.status(400).json({ message: 'Please make your password at least 6 characters long for security purposes.' });
      return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) { res.status(500).json({ message: "email check went bad." }); return; }
    if (foundUser) { res.status(400).json({ message: 'username taken. Choose another one.' }); return; }
    
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({username, email, password: hashPass });
    var token = utils.generateToken(aNewUser); //<----- Generate Token

      User.create({username: aNewUser.username, email: aNewUser.email, password: aNewUser.password, token: token})
      .then((newUser) => {

        req.login(newUser, (err) => {
              if (err) { res.status(500).json({ message: 'Login after signup went bad.' }); return; }
      
              theNewUser = utils.getCleanUser(newUser);
              res.status(200).json({user: theNewUser, token: newUser.token}); // <----- Return both user and token
          });
        
      }).catch(err => {
        res.status(400).json({ message: `Saving user to database went wrong, ${err}`})
      })
        // aNewUser.save((err, aNewUser) => {
        //       if (err) { res.status(400).json({ message: 'Saving user to database went wrong.' }); return; }
        // console.log(aNewUser)
              // Automatically log in user after sign up  .login() here is actually predefined passport method
              // req.login(aNewUser, (err) => {
              //     if (err) { res.status(500).json({ message: 'Login after signup went bad.' }); return; }
              //     console.log("llega hasta crear el token")

              //     var token = utils.generateToken(aNewUser); //<----- Generate Token
              //     console.log(token)

              //     theNewUser = utils.getCleanUser(aNewUser);
              //   console.log(theNewUser)
              //     // Send the user's information to the frontend. We can use also: res.status(200).json(req.user);
              //     res.status(200).json({user: theNewUser, token:token}); // <----- Return both user and token
              //   //   res.status(200).json(aNewUser); // <----- Return both user and token

              // });
          // });   

  });
});




authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) { res.status(500).json({ message: 'Something went wrong authenticating user' }); return; }
      // "failureDetails" contains the error messages from our logic in "LocalStrategy" { message: '...' }.
      if (!theUser) { res.status(401).json(failureDetails); return; }
      // save user in session
      req.login(theUser, (err) => {
          if (err) { res.status(500).json({ message: 'Session save went bad.' }); return; }
          // We are now logged in (that's why we can also send req.user)
         
          var token = utils.generateToken(theUser); //<----- Generate Token
          theNewUser = utils.getCleanUser(theUser);

          res.status(200).json({user: theNewUser, token: token});
      });
  })(req, res, next);
});



authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});



authRoutes.get('/loggedin', (req, res, next) => {
 
        var token = req.body.token || req.query.token || req.params.token  || req.headers['x-access-token']
    
      if (!token) {
        return res.status(401).json({
          message: 'Must pass token'
        });
      }

  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err)
      throw err;
      User.findById(user._id, (err, foundUser) => {
        if (err) { res.status(500).json({ message: 'Something went wrong finding the user' }); return; }
        user = utils.getCleanUser(foundUser); //dont pass password and stuff

        //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
        // var token = utils.generateToken(user);
       res.status(200).json({user: user, token:token });
        
      })
      
  })

  //OLD_VERSION

    // req.isAuthenticated() is defined by passport
//   if (req.isAuthenticated()) {
//       res.status(200).json(req.user);
//       return;
//   }
//   res.status(403).json({ message: 'Unauthorized' });
});


module.exports = authRoutes;