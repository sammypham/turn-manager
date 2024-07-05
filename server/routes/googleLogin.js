require('dotenv').config();
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const port = 4000

const router = express.Router()

// ID for google OAUTH
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

function hash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://localhost:${port}/auth/google/callback`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    scope: ['profile', 'email']
}, (token, tokenSecret, profile, done) => {

    // Extract user email from the profile object
    const userEmail = profile.emails[0].value;
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), async (req, res) => {
    req.session.hashedGoogleId = hash(req.user.id);
    // Here we would search in the database to see if the user exists there
    // If so, we set req.session.loggedIn to true, otherwise register an account
    req.session.loggedIn = true;  
    res.redirect('http://localhost:3000');
}
);

router.get('/logout', (req,res) => {
    console.log(req.session.hashedGoogleId)
    req.logout((err) => {
        if (err) {
          // Handle error, e.g., logging or sending an error response
          console.error('Error during logout:', err);
          return res.status(500).json({ error: 'Logout failed' });
        }
        // Successful logout
        res.redirect('http://localhost:3000'); // Redirect or respond as needed
      });
}
);

module.exports = router