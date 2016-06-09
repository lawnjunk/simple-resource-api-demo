'use strict'

// npm modules
const debug = require('debug')('authdemo:auth-controller')

// app modules
const User = require('../model/user')

exports.signup = function(reqBody){
  debug('signup')
  return new Promise((resolve, reject) => {
    var password = reqBody.password
    delete reqBody.password
    var user = new User(reqBody)
    user.generateHash(password)
    .then( user => user.save())
    .then( user => user.generateToken())
    .then(resolve)
    .catch(reject)
  })
}

exports.signin = function(auth){
  debug('signin')
  return new Promise((resolve, reject) => {
    User.findOne({username: auth.username})
    .then(user => user.compareHash(auth.password))
    .then(user => user.generateToken())
    .then(token => resolve(token))
    .catch(reject)
  })
}

