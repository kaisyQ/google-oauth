const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passport-setup')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
  res.json({message: 'This is main page'})
})

app.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))

app.get('/bad', (req, res) => {
  res.json({message: 'Please log in'})
})

app.get('/good', (req, res) => {
  res.json({message: 'Welcome'})
})

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/bad' }),
  function(req, res) {
    res.redirect('/good');
});

app.listen(3000, () => {
  console.log('app is listening on port 3000');
})
