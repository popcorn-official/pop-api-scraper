// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import del from 'del'
import mkdirp from 'mkdirp'
import { expect } from 'chai'
import { existsSync } from 'fs'
import { join } from 'path'

import { HttpService } from '../../src'

/** @test {HttpService} */
describe('HttpService', () => {
  /**
   * The HttpService object to be tested.
   * @type {HttpService}
   */
  let httpService: HttpService

  /**
   * The temporary directory to store the status and updated files.
   * @type {string}
   */
  let tempDir: string

  /**
   * Hook for setting up the HttpService tests.
   * @type {Function}
   */
  before(() => {
    tempDir = join(...[
      __dirname,
      '..',
      '..',
      'tmp'
    ])
    del.sync([tempDir])
    mkdirp.sync(tempDir)

    httpService = new HttpService({
      baseUrl: 'https://jsonplaceholder.typicode.com/'
    })
  })

  /** @test {HttpService#request} */
  it('should make a successful HTTP request', done => {
    httpService.request('GET', 'posts/1', {
      json: true
    }, true).then(res => {
      expect(res).to.be.an('object')
      done()
    }).catch(done)
  })

  /** @test {HttpService#download} */
  it('should fail to download a given link', done => {
    const fileName = 'file.json'
    const filePath = join(...[tempDir, fileName])
    const endpoint = '/faulty/1'

    expect(existsSync(filePath)).to.be.false

    httpService.download(endpoint, fileName)
      .then(done)
      .catch(() => {
        expect(existsSync(filePath)).to.be.false
        done()
      })
  })

  /** @test {HttpService#download} */
  it('should successfully download a given link', done => {
    const fileName = 'file.json'
    const filePath = join(...[tempDir, fileName])
    const endpoint = '/posts/1'

    expect(existsSync(filePath)).to.be.false

    httpService.download(endpoint, filePath).then(res => {
      expect(res).to.be.a('string')
      expect(existsSync(filePath)).to.be.true

      done()
    }).catch(done)
  })

  /**
   * Hook for tearing down the HttpService tests.
   * @type {Function}
   */
  after(() => {
    del.sync(tempDir)
  })
})
