const express = require('express')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express()
const port = 4000

// ID for google OAUTH
const CLIENT_ID="x"
const CLIENT_SECRET="y"

// Passport configuration
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: `http://localhost:${port}/auth/google/callback`,
    userProfileURL:'https://www.googleapis.com/oauth2/v3/userinfo',
    scope: ['profile']
}, (token, tokenSecret, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true  // enable credentials (cookies, authorization headers)
  }));

// Routes
const techRoute = require('./routes/appendTech')
const servicesRoute = require('./routes/services')

// Middleware
app.use(express.json());

app.use('/api/tech', techRoute)
app.use('/api/service', servicesRoute)

// session variable
app.use(
    session({
        secret: 'oneringtorulethemall',     // Secret key to sign the session ID cookie
        resave: false,                      // Don't save session if unmodified
        saveUninitialized: false,           // Don't create session until something stored
        cookie: { secure: false },          // True if using https. Set to false for development without https
    })
);

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false
    res.locals.hashedGoogleId = req.session.hashedGoogleId || '';
    next();
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), async (req, res) => {
    const googleId = req.user.id;
    console.log(req.user.id)
    res.redirect('http://localhost:3000');
}
);



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

