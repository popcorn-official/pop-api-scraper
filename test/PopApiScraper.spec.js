// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import cluster from 'cluster'
import del from 'del'
import mkdirp from 'mkdirp'
import sinon from 'sinon'
import { expect } from 'chai'
import { join } from 'path'
import { PopApi } from 'pop-api'

import ExampleProvider from '../examples/ExampleProvider'
import { PopApiScraper } from '../src'

/** @test {PopApiScraper} */
describe('PopApiScraper', () => {
  /**
   * The PopApiScraper to test with.
   * @type {PopApiScraper}
   */
  let popApiScraper: PopApiScraper

  /**
   * The temporary directory to store the status and updated files.
   * @type {string}
   */
  let tempDir: string

  /**
   * Hook for setting up the PopApiScraper tests.
   * @type {Function}
   */
  before(() => {
    tempDir = join(...[
      __dirname,
      '..',
      'tmp'
    ])
    del.sync([tempDir])
    mkdirp.sync(tempDir)

    popApiScraper = new PopApiScraper(PopApi, {
      statusPath: join(...[
        tempDir,
        'status.json'
      ]),
      updatedPath: join(...[
        tempDir,
        'updated.json'
      ])
    })
  })

  /** @test {PopApiScraper#constructor} */
  it('should check the attributes of the PopApiScraper', () => {
    expect(popApiScraper.context).to.exist
    expect(popApiScraper.context).to.be.an('object')
    expect(popApiScraper.statusPath).to.exist
    expect(popApiScraper.statusPath).to.be.a('string')
    expect(popApiScraper.updatedPath).to.exist
    expect(popApiScraper.updatedPath).to.be.a('string')
  })

  /** @test {PopApiScraper#constructor} */
  it('should only create teh status files on the master node', () => {
    const stub = sinon.stub(cluster, 'isMaster')
    stub.value(false)

    new PopApiScraper(PopApi, { // eslint-disable-line no-new
      statusPath: join(...[
        tempDir,
        'status.json'
      ]),
      updatedPath: join(...[
        tempDir,
        'updated.json'
      ])
    })

    stub.restore()
  })

  /** @test {PopApiScraper#constructor} */
  it('should throw an error if the required options are not given', () => {
    try {
      new PopApiScraper(PopApi, {}) // eslint-disable-line no-new
      expect(true).to.be.false
    } catch (err) {
      expect(err).to.be.an('Error')
      expect(err.message).to.equal(
        '\'statusPath\' and \'updatedPath\' are required options for the PopApiScraper middleware!'
      )
    }
  })

  /** @test {PopApiScraper#setStatus} */
  it('should set the status of the scraper', done => {
    popApiScraper.setStatus('status').then(res => {
      expect(res).to.be.undefined
      done()
    }).catch(done)
  })

  /** @test {PopApiScraper#getStatus} */
  it('should get the status of the scraper', done => {
    popApiScraper.getStatus().then(res => {
      expect(res).to.be.a('string')
      done()
    }).catch(done)
  })

  /** @test {PopApiScraper#setUpdated} */
  it('should set the updated status of the scraper', done => {
    popApiScraper.setUpdated(123456789).then(res => {
      expect(res).to.be.undefined
      done()
    }).catch(done)
  })

  /** @test {PopApiScraper#getUpdated} */
  it('should get the updated status of the scraper', done => {
    popApiScraper.getUpdated().then(res => {
      expect(res).to.be.a('number')
      done()
    }).catch(done)
  })

  /**
   * Helper function to test the `use` method.
   * @param {!string} msg - The message to print for the test.
   * @returns {undefined}
   */
  function testUse(msg: string): void {
    /** @test {PopApiScraper.use} */
    it(msg, () => {
      PopApiScraper.use(ExampleProvider, {
        name: 'exampleProvider',
        configs: [{
          baseUrl: 'https://jsonplaceholder.typicode.com/'
        }]
      })

      expect(PopApiScraper._installedPlugins).to.be.a('Map')
      expect(PopApiScraper._installedPlugins.size).to.equal(1)
    })
  }

  // Execute the tests.
  [
    'should register a middleware plugin',
    'should not register the same plugin twice'
  ].map(testUse)

  /** @test {PopApiScraper.use} */
  it('should not register the plugin if it is not a class', () => {
    PopApiScraper.use({})

    expect(PopApiScraper._installedPlugins).to.be.a('Map')
    expect(PopApiScraper._installedPlugins.size).to.equal(1)
  })

  /** @test {PopApiScraper#scrape} */
  it('should call the scrape method', done => {
    popApiScraper.scrape().then(res => {
      expect(res).to.be.an('array')
      done()
    }).catch(done)
  })

  /**
   * Hook for tearing down the PopApiScraper tests.
   * @type {Function}
   */
  after(() => {
    del.sync(tempDir)
  })
})
