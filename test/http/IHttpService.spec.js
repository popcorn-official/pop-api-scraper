// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import { IHttpService } from '../../src'

/** @test {IHttpService} */
describe('IHttpService', () => {
  /**
   * The IHttpService object to be tested.
   * @type {IHttpService}
   */
  let iHttpService: IHttpService

  /**
   * Hook for setting up the IHttpService tests.
   * @type {Function}
   */
  before(() => {
    iHttpService = new IHttpService()
  })

  /** @test {IHttpService#get} */
  it('should throw an error when calling the get method', () => {
    expect(iHttpService.get).to
      .throw('Using default method: \'get\'')
  })

  /** @test {IHttpService#post} */
  it('should throw an error when calling the post method', () => {
    expect(iHttpService.post).to
      .throw('Using default method: \'post\'')
  })
  /** @test {IHttpService#put} */
  it('should throw an error when calling the put method', () => {
    expect(iHttpService.put).to
      .throw('Using default method: \'put\'')
  })
  /** @test {IHttpService#delete} */
  it('should throw an error when calling the delete method', () => {
    expect(iHttpService.delete).to
      .throw('Using default method: \'delete\'')
  })

  /** @test {IHttpService#printDebug} */
  it('should throw an error when calling the printDebug method', () => {
    expect(iHttpService.printDebug).to
      .throw('Using default method: \'printDebug\'')
  })

  /** @test {IHttpService#request} */
  it('should throw an error when calling the request method', () => {
    expect(iHttpService.request).to
      .throw('Using default method: \'request\'')
  })
})
