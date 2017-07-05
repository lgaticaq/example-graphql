'use strict'

const { GraphQLString, GraphQLFloat, GraphQLObjectType } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'Bombero',
  description: 'Esquema del Cuerpo de Bomberos',
  fields: () => ({
    address: {
      type: GraphQLString,
      description: 'Dirección del Cuerpo de Bomberos'
    },
    commune: {
      type: GraphQLString,
      description: 'Comuna del Cuerpo de Bomberos'
    },
    country: {
      type: GraphQLString,
      description: 'País del Cuerpo de Bomberos'
    },
    latitude: {
      type: GraphQLFloat,
      description: 'Latitud del Cuerpo de Bomberos'
    },
    longitude: {
      type: GraphQLFloat,
      description: 'Longitud del Cuerpo de Bomberos'
    },
    name: {
      type: GraphQLString,
      description: 'Nombre del Cuerpo de Bomberos'
    },
    phone: {
      type: GraphQLString,
      description: 'Teléfono del Cuerpo de Bomberos'
    },
    region: {
      type: GraphQLString,
      description: 'Región del Cuerpo de Bomberos'
    }
  })
})
