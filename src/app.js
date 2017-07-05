'use strict'

const express = require('express')
const mongoose = require('mongoose')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

mongoose.Promise = global.Promise

const db = async function () {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost/beerjs'
    mongoose.connect(uri)
  } catch (err) {
    console.log(err) // eslint-disable-line
    process.exit(1)
  }
}

db()

const app = express()

app.use(
  '/graphql',
  graphqlHTTP(req => ({
    schema,
    graphiql: true
  }))
)

module.exports = app
