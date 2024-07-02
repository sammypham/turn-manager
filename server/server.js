const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSucessStatus: 200
}
app.use(cors(corsOptions))
app.use('/api/tech', router)

const port = 4000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

