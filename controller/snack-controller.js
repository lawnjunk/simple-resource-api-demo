'use strict'

const debug = require('debug')('authdemo:snack-controller');
const createError = require('http-errors')

const Snack = require('../model/snack')

exports.createSnack = function(data){
  debug('createSnack')
  return new Promise((resolve, reject) => {
    const snack = new Snack(data)
    snack.save()
    .then(resolve)
    .catch(err => reject(createError(400, err.message)))
  })
}

exports.fetchUserSnacks = function(data){
  debug('fetchUserSnacks')
  return Snack.find({userId: data.userId})  
}

exports.removeAllSnacks = function(){
  debug('removeAllSnacks')
  return Snack.remove({})
}
