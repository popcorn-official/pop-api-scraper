// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import { IProvider } from '../../src'

/** @test {IProvider} */
describe('IProvider', () => {
  /**
   * The IProvider object to be tested.
   * @type {IProvider}
   */
  let iProvider: IProvider

  /**
   * Hook for setting up the IProvider tests.
   * @type {Function}
   */
  before(() => {
    iProvider = new IProvider()
  })

  /** @test {IProvider#scrapeConfig} */
  it('should throw an error when calling the scrapeConfig method', () => {
    expect(iProvider.scrapeConfig).to
      .throw('Using default method: \'scrapeConfig\'')
  })

  /** @test {IProvider#scrapeConfigs} */
  it('should throw an error when calling the scrapeConfigs method', () => {
    expect(iProvider.scrapeConfigs).to
      .throw('Using default method: \'scrapeConfigs\'')
  })
})
