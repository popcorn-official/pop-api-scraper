// @flow
import got from 'got'
import { URL } from 'url'
import { createWriteStream, unlinkSync } from 'fs'

import AbstractHttpService from './AbstractHttpService'

/**
 * Class for making HTTP calls with the got library.
 * @extends {AbstractHttpService}
 * @type {HttpService}
 */
export default class HttpService extends AbstractHttpService {

  /**
   * Make a HTTP request.
   * @param {!string} method - The method of the HTTP request.
   * @param {!string} [endpoint] - The endpoint to make the HTTP request to.
   * @param {?Object} [opts] - The options for the HTTP request.
   * @param {?boolean} [raw] - Return the raw body.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  request(
    method: string,
    endpoint: string,
    opts?: Object,
    raw?: boolean
  ): Promise<any | Error> {
    const { href } = new URL(endpoint, this.baseUrl)

    const options = {
      ...this.options,
      ...opts,
      method
    }
    this.printDebug(method, href, options)

    return got(href, options)
      .then(({ body }) => this.handleBody(body, raw))
  }

  /**
   * Request to download an item.
   * @param {!string} endpoint - The uri to the item.
   * @param {!string} filePath - The name of the file to save the item.
   * @returns {Promise<string, Error>} - Message when it's finally
   * downloaded.
   */
  download(endpoint: string, filePath: string): Promise<string | Error> {
    const { href } = new URL(endpoint, this.baseUrl)
    this.printDebug('GET', href)

    return new Promise((resolve, reject) => {
      const stream = createWriteStream(filePath)
      const req = got.stream(href, this.options)

      req.on('error', err => {
        req.end()

        stream.end(() => unlinkSync(filePath))

        const error = new Error(
          `Error on: '${filePath}', uri: '${href}', ${err}`
        )
        return reject(error)
      })

      req.on('response', function () {
        this.pipe(stream)
        stream.on('finish', () => resolve(filePath))
      })
    })
  }

}
