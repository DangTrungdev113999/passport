const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./../../models/User");

let LocalStragery = passportLocal.Strategy; 


let initPassportLocal = () => {
  passport.use(
    new LocalStragery(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      async (req, username, password, done) => {
        try {
          let user = await User.findOne({username, password}).exec();
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(null, false);
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id); 
  })

  passport.deserializeUser( async(id, done) => {
    try {
      let user = await User.findById(id).exec();
      done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
}

module.exports = initPassportLocal;