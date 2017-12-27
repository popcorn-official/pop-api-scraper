// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import { AbstractHttpService } from '../../src'

/** @test {AbstractHttpService} */
describe('AbstractHttpService', () => {
  /**
   * The AbstractHttpService object to be tested.
   * @type {AbstractHttpService}
   */
  let abstractHttpService: AbstractHttpService

  /**
   * Hook for setting up the AbstractHttpService tests.
   * @type {Function}
   */
  before(() => {
    abstractHttpService = new AbstractHttpService({
      baseUrl: 'https://jsonplaceholder.typicode.com/'
    })
  })

  /** @test {HttpService#constructor} */
  it('should throw an error when calling the get method', () => {
    abstractHttpService = new AbstractHttpService({
      baseUrl: 'https://jsonplaceholder.typicode.com',
      options: {}
    })
  })

  /** @test {AbstractHttpService#get} */
  it('should throw an error when calling the get method', () => {
    expect(abstractHttpService.get.bind(abstractHttpService)).to
      .throw('Using default method: \'request\'')
  })

  /** @test {AbstractHttpService#post} */
  it('should throw an error when calling the post method', () => {
    expect(abstractHttpService.post.bind(abstractHttpService)).to
      .throw('Using default method: \'request\'')
  })

  /** @test {AbstractHttpService#put} */
  it('should throw an error when calling the put method', () => {
    expect(abstractHttpService.put.bind(abstractHttpService)).to
      .throw('Using default method: \'request\'')
  })

  /** @test {AbstractHttpService#delete} */
  it('should throw an error when calling the delete method', () => {
    expect(abstractHttpService.delete.bind(abstractHttpService)).to
      .throw('Using default method: \'request\'')
  })

  /** @test {AbstractHttpService#download} */
  it('should throw an error when calling the download method', () => {
    expect(abstractHttpService.download.bind(abstractHttpService)).to
      .throw('Using default method: \'download\'')
  })

  /** @test {AbstractHttpService#handleBody} */
  it('should get the raw body of a request', () => {
    const body = '<html><head><title>Test</title></head></html>'
    const res = abstractHttpService.handleBody(body, true)
    expect(res).to.equal(body)
  })

  /** @test {AbstractHttpService#handleBody} */
  it('should get the body wrapped in cheerio', () => {
    const body = '<html><head><title>Test</title></head></html>'
    const res = abstractHttpService.handleBody(body, false)
    expect(res).to.be.a('function')
  })

  /** @test {AbstractHttpService#request} */
  it('should throw an error when calling the _request method', () => {
    expect(abstractHttpService.request.bind(abstractHttpService)).to
      .throw('Using default method: \'request\'')
  })

  /** @test {AbstractHttpService#printDebug} */
  it('should throw an error when calling the _printDebug method', () => {
    const url = 'https://jsonplaceholder.typicode.com'
    const toStringify = {
      key: 'value'
    }

    let res = abstractHttpService.printDebug('GET', url, {
      body: toStringify
    })
    expect(res).to.be.undefined

    res = abstractHttpService.printDebug('GET', url, {
      query: toStringify
    })
    expect(res).to.be.undefined

    res = abstractHttpService.printDebug('GET', url, {
      form: toStringify
    })
    expect(res).to.be.undefined

    res = abstractHttpService.printDebug('GET', url, {})
    expect(res).to.be.undefined

    res = abstractHttpService.printDebug('GET', url)
    expect(res).to.be.undefined
  })
})
