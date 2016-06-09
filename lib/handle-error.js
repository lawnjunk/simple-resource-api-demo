'use strict'

const debug = require('debug')('authdemo:handle-error')

module.exports = function(err, req, res, next){
  debug('handle-error')
  console.error(err)
  if (err.status){
    res.status(err.status).send(err.name)
    next()
    return
  }
  res.status(500).send('InternalServerError')
  next()
}
