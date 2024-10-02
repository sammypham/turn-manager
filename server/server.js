const dotenv = require('dotenv');

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const port = process.env.SERVER_PORT;

const server = http.createServer(app);

// cors
app.use(cors({
    origin: `${process.env.APP_URL}:${process.env.SERVER_PORT}`,
    credentials: true,
}));

// Routes
const techRoute = require('./routes/technicians');
const servicesRoute = require('./routes/services');
const loginRoute = require('./routes/googleLogin');
const businessesRoute = require('./routes/businesses');
const signInRoute = require('./routes/sign_in');
const serviceRecordRoute = require('./routes/service_record');
const userRoute = require('./routes/user');
const editRoute = require('./routes/editBusiness');
const demoRoute = require('./routes/demo');

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
        cookie: {
            secure: process.env.NODE_ENV === "production" ? true : false, // True if using https. Set to false for development without https
            maxAge: 86400000
        },          // True if using https. Set to false for development without https
    })
);


app.set('views', __dirname);
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use('/api/tech', techRoute);
app.use('/api/service', servicesRoute);
app.use('/auth/google', loginRoute);
app.use('/api/business', businessesRoute);
app.use('/api/sign_in', signInRoute);
app.use('/api/service_record', serviceRecordRoute);
app.use('/api/user', userRoute);
app.use('/api/edit', editRoute);
app.use('/api/demo', demoRoute);

const socketOrigin = process.env.NODE_ENV === "production"
    ? `${process.env.APP_URL}`
    : `${process.env.APP_URL}:${process.env.CLIENT_PORT}`

const io = new Server(server, {
    cors: {
        origin: socketOrigin,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User CONNECTED: ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log(`JOINED ROOM: ${data}`);
        socket.join(data);
    });

    socket.on("refresh_home", (data) => {
        console.log("Broadcasting To: ", data.room);
        socket.broadcast.to(data.room).emit("receive_home_refresh", data);
    })
})

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

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    connectDB();
});