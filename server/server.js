const express = require('express')
const app = express()
const port = 4000

// Routes
const techRoute = require('./routes/appendTech')
const servicesRoute = require('./routes/services')

// Middleware
app.use(express.json());

app.use('/api/tech', techRoute)
app.use('/api/service', servicesRoute)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

