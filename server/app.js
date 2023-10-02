const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const connectDB = require('./mongoDB/connectDB')
const app = express()
var cors = require('cors')

//middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())

//routes
const router = require('./routes/routes')
app.use('/api/v1', router)

app.get('/', async (req, res) => {
    res.send('<h1>travell log app</h1>')
})

//error handeler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(err.message)
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, console.log('the server is listening on port 3000...'))
    } catch (error) {
        console.log(error);
    }
}

start()
