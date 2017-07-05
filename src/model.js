'use strict'

const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  address: String,
  commune: String,
  country: String,
  latitude: Number,
  longitude: Number,
  name: String,
  phone: String,
  region: String
})

module.exports = mongoose.model('Bombero', Schema)
