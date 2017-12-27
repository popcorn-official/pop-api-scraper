// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import { AbstractProvider } from '../../src'

/** @test {AbstractProvider} */
describe('AbstractProvider', () => {
  /** @test {AbstractProvider#scrapeConfigs} */
  it('should throw an error when calling the scrapeConfigs method', done => {
    const abstractProvider = new AbstractProvider({}, {
      baseUrl: 'https://jsonplaceholder.typicode.com/',
      configs: [{}]
    })

    abstractProvider.scrapeConfigs()
      .then(done)
      .catch(err => {
        expect(err).to.be.an('Error')
        done()
      })
  })
})
