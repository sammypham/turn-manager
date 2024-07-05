require('dotenv').config();

const express = require('express')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express()
const port = 4000



// cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true  // enable credentials (cookies, authorization headers)
}));

// Routes
const techRoute = require('./routes/appendTech')
const servicesRoute = require('./routes/services')
const loginRoute = require('./routes/googleLogin')

// Middleware
app.use(express.json());

// session variable
app.use(
    session({
        secret: 'oneringtorulethemall',     // Secret key to sign the session ID cookie
        resave: false,                      // Don't save session if unmodified
        saveUninitialized: false,           // Don't create session until something stored
        cookie: { secure: false },          // True if using https. Set to false for development without https
    })
);

app.use('/api/tech', techRoute)
app.use('/api/service', servicesRoute)
app.use('/auth/google', loginRoute)




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

