'use strict'

// npm modules
const debug = require('debug')('authdemo:user-controller')

// app modules
const User = require('../model/user')

exports.removeAllUsers = function(){
  debug('removeAllUsers')
  return User.remove({})
}
