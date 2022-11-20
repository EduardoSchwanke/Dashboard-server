require('dotenv').config()

const express = require('express')
const routes = require('./routes')
const mongoose= require('mongoose')
const connectToDatabase = require('./database')

connectToDatabase()

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3333, () => {
    console.log('Backend is running...')
})