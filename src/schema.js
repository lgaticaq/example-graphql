'use strict'

const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const { bomberos } = require('./mutations')

const Query = new GraphQLObjectType({
  name: 'BomberoSchema',
  description: 'Root del Cuerpo de Bomberos',
  fields: () => ({
    bomberos: bomberos
  })
})

module.exports = new GraphQLSchema({ query: Query })
