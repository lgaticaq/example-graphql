'use strict'

const { expect } = require('chai')
const { describe, it } = require('mocha')
const { stringify } = require('querystring')
const request = require('supertest')
const app = require('../src/app')
const Bombero = require('../src/model')

const urlString = urlParams => {
  let string = '/graphql'
  if (urlParams) {
    string += '?' + stringify(urlParams)
  }
  return string
}

describe('GraphQL-HTTP tests', () => {
  before(async function () {
    const fixtures = [
      {
        address: 'Vicuña Mackenna 802',
        commune: 'Arica',
        country: 'Chile',
        latitude: -18.480781,
        longitude: -70.311448,
        name: 'Cuerpo de Bomberos de Arica',
        phone: '+56582257614',
        region: 'Región de Arica y Parinacota'
      }
    ]
    try {
      await Bombero.insertMany(fixtures)
    } catch (err) {
      throw err
    }
  })

  it('test GET only name', async () => {
    const response = await request(app)
      .get(
        urlString({
          query: '{ bomberos { name } }'
        })
      )
      .expect(200)
    const result = JSON.parse(response.text)
    expect(result.data.bomberos[0]).to.eql({
      name: 'Cuerpo de Bomberos de Arica'
    })
  })

  it('test GET name, and address', async () => {
    const response = await request(app)
      .get(
        urlString({
          query: '{ bomberos { name, address } }'
        })
      )
      .expect(200)
    const result = JSON.parse(response.text)
    expect(result.data.bomberos[0]).to.eql({
      name: 'Cuerpo de Bomberos de Arica',
      address: 'Vicuña Mackenna 802'
    })
  })

  it('test GET all fields', async () => {
    const response = await request(app)
      .get(
        urlString({
          query:
            '{ bomberos { address, commune, country, latitude, longitude, name, phone, region } }'
        })
      )
      .expect(200)
    const result = JSON.parse(response.text)
    expect(result.data.bomberos[0]).to.eql({
      address: 'Vicuña Mackenna 802',
      commune: 'Arica',
      country: 'Chile',
      latitude: -18.480781,
      longitude: -70.311448,
      name: 'Cuerpo de Bomberos de Arica',
      phone: '+56582257614',
      region: 'Región de Arica y Parinacota'
    })
  })

  it('test GET filter by country', async () => {
    const response = await request(app)
      .get(
        urlString({
          query: '{ bomberos(country: "Chile") { country } }'
        })
      )
      .expect(200)
    const result = JSON.parse(response.text)
    expect(result.data.bomberos[0]).to.eql({ country: 'Chile' })
  })

  it('test GET without results', async () => {
    const response = await request(app)
      .get(
        urlString({
          query: '{ bomberos(country: "asdf") { country } }'
        })
      )
      .expect(200)
    const result = JSON.parse(response.text)
    expect(result.data.bomberos[0]).to.eql(undefined)
  })

  after(async function () {
    try {
      await Bombero.remove({}).exec()
    } catch (err) {
      throw err
    }
  })
})
