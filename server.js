'use strict'

// npm modules
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const httpErrors = require('http-errors')
const debug = require('debug')('authdemo:server')
const cors = require('cors')

// app modules
const handleError = require('./lib/handle-error')
const authRouter = require('./route/auth-router')
const parseBearerAuth = require('./lib/parse-bearer-auth')

// constants
const port = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/dev'
const app = express()

// setup mongo
mongoose.connect(mongoURI)

// setup middleware
app.use(morgan('dev'))
app.use(cors())

// setup rotues
app.use('/api', authRouter)

app.get('/api/wat', parseBearerAuth, function(req, res, next){
  res.send(req.userId)
})

app.all('*', (req, res, next) => {
  debug(`404 * route`)
  const err = httpErrors(404, 'not a valid rotue')
  next(err)
});

app.use(handleError)

const server = app.listen(port, () => {
  debug(`server up :: ${port}`)
})

server.isRunning = true
module.exports = server

