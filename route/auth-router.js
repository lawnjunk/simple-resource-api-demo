'use strict'

// npm modules
const Router = require('express').Router
const jsonParser = require('body-parser').json()
const authRouter = module.exports = new Router()
const debug = require('debug')('authRouter:auth-router')

// app modules
const parseBasicAuth = require('../lib/parse-basic-auth')
const authController = require('../controller/auth-controller')

authRouter.post('/signup', jsonParser, function(req, res, next){
  debug('POST /api/signup')
  authController.signup(req.body)
  .then( token => res.send(token))
  .catch(next)
})

authRouter.get('/signin', parseBasicAuth, function(req, res, next){
  debug('GET /api/signin')
  authController.signin(req.auth)
  .then( token => res.send(token))
  .catch(next)
});
