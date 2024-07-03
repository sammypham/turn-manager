const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const appendTech = require('./routes/appendTech')
const services = require('./routes/services')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))


app.use('/api/tech', appendTech)
app.use('/api/service', services)


const port = 4000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

