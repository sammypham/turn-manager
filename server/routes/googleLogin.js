require('dotenv').config();
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const crypto = require('crypto');
const { User } = require('../models/users');
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
    try {
        const googleId = req.user.id;
        const email = req.user.emails[0].value;

        // Hash the Google ID and store it in the session
        req.session.hashedGoogleId = hash(googleId);
        req.session.loggedIn = true;

        // Search for the user in the database
        const user = await User.findOne({ googleId: googleId });

        if (!user) {
            // If the user does not exist, create a new user
            user = new User({
                email: email,
                googleId: googleId
            });

            await user.save();
        }

        req.session.user_id = user._id;
        // Redirect to the client application
        res.redirect('http://localhost:3000');
    } catch (error) {
        console.error('Error during authentication callback:', error);
        res.redirect('http://localhost:3000');
    }
}
);

router.get('/logout', (req, res) => {
    res.render('Logout')
}
);

router.get('/logoutCallback', (req, res) => {
    console.log(req.session.user_id);
    req.session.currentBusiness = undefined;
    req.logout((err) => {
        if (err) {
            // Handle error, e.g., logging or sending an error response
            console.error('Error during logout:', err);
            return res.status(500).json({ error: 'Logout failed' });
        }
        // Successful logout
        res.redirect('/'); // Redirect or respond as needed
    });
}
);

module.exports = router