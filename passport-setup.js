const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy


passport.use(new GoogleStrategy({
    clientID: '351875941422-7291npe15b4vsf1patnn1c3br9hjsdbl.apps.googleusercontent.com',
    clientSecret: 'rsnBLJ0YifeaziKdttAOk8RN',
    callbackURL: 'http://localhost:3000/good'
}, (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
}))