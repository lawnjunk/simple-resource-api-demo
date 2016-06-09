'use strict'

const debug = require('debug')('authdemo:snack')
const mongoose = require('mongoose')

const snackSchema = mongoose.Schema({
  name: {type: String, required: true}
  , description: {type: String, required: true}
  , ingredients: {type: Array, required: true}
  , userId: {type: mongoose.Types.ObjectId, required:true}
  , created: {type: Date, required: true}
})

const Snack = module.exports =  mongoose.model('snack', snackSchema);

Snack.schema.path('ingredients').validate(function(value){
  debug('ingredients validater')
  return value.length < 5
}, 'ingredients must be less than 5')
