const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}))

app.use('/', routes)

module.exports = app