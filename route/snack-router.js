'use strict'

// npm modules
const Router = require('express').Router
const jsonParser = require('body-parser').json()
const debug = require('debug')('authdemo:snack-router')

// app modules
const parseBearerAuth = require('../lib/parse-bearer-auth')
const snackController = require('../controller/snack-controller')

// module constatns
const snackRouter = module.exports = new Router()

snackRouter.post('/snack', parseBearerAuth, jsonParser, function(req, res, next){
  req.body.userId = req.userId
  req.created = new Date()
  snackController.createSnack(req.body)
  .then(snack => res.json(snack))
  .catch(next)
})


