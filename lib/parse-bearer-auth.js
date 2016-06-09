'use strict'
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const createError = require('http-errors')
const debug = require('debug')('authdemo:parse-bearer-auth')

module.exports = function(req, res, next){
  debug('parseBearerAuth')
  try{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.APP_SECRET, function(err, decoded){
      if (err)
        throw err
      User.findOne({findHash: decoded.idd})
      .then(user => {
        req.userId = user._id
        next()
      })
      .catch( err => {
        err = createError(401, err.message)
        next(err)
      })
    })
  } catch (err) {
    debug('there was an error')
    err = createError(401, err.message)
    next(err)
  }
}
