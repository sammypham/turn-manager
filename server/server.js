require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
const port = 4000

// cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,  // enable credentials (cookies, authorization headers)
}));

// Routes
const techRoute = require('./routes/appendTech');
const servicesRoute = require('./routes/services');
const loginRoute = require('./routes/googleLogin');
const businessesRoute = require('./routes/businesses');

const { User } = require('./models/users');
const { Business } = require('./models/business');
const { Technician } = require('./models/technician');
const { Service } = require('./models/service');

// Middleware
app.use(express.json());

// session variable
app.use(
    session({
        secret: process.env.SESSION_SECRET,     // Secret key to sign the session ID cookie
        resave: false,                      // Don't save session if unmodified
        saveUninitialized: false,           // Don't create session until something stored
        cookie: { secure: false },          // True if using https. Set to false for development without https
    })
);

app.use('/api/tech', techRoute)
app.use('/api/service', servicesRoute)
app.use('/auth/google', loginRoute)
app.use('/api/business', businessesRoute)

async function connectDB() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        db = mongoose.connection;

        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1); // Exit the process if unable to connect to the database
    }
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    connectDB();
});