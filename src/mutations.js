'use strict'

const { GraphQLList, GraphQLString } = require('graphql')

const Bombero = require('./model')
const BomberoType = require('./type')

const bomberos = {
  type: new GraphQLList(BomberoType),
  description: "Bombero collection's type",
  args: {
    commune: {
      description: 'Comuna del Cuerpo de Bomberos',
      type: GraphQLString
    },
    region: {
      description: 'Región del Cuerpo de Bomberos',
      type: GraphQLString
    },
    country: {
      description: 'Pais del Cuerpo de Bomberos',
      type: GraphQLString
    }
  },
  resolve: (root, args) => Bombero.find(args).exec()
}

module.exports = { bomberos: bomberos }
