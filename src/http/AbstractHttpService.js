// Import the necessary modules.
// @flow
import cheerio from 'cheerio'
import debug from 'debug'
import { stringify } from 'querystring'

import IHttpService from './IHttpService'
import { name } from '../../package.json'

/**
 * Class for making HTTP calls.
 * @abstract
 * @implements {IHttpService}
 * @type {AbstractHttpService}
 */
export default class AbstractHttpService extends IHttpService {

  /**
   * The base url of the website to scrape.
   * @type {string}
   */
  baseUrl: string

  /**
   * The default options for the HTTP requests.
   * @type {Object}
   */
  options: Object

  /**
   * The debug function for extra output.
   * @type {Function}
   */
  _debug: Function

  /**
   * Create a new Request object.
   * @param {!string} baseUrl - The base url of the website to scrape.
   * @param {?Object} options={} - The default options for the HTTP requests.
   */
  constructor({baseUrl, options = {}}: Object): void {
    super()

    /**
     * The the base url of hte website to scrape.
     * @type {string}
     */
    this.baseUrl = baseUrl
    /**
     * The default options for the HTTP requests.
     * @type {Object}
     */
    this.options = options
    /**
     * The debug function for extra output.
     * @type {Function}
     */
    this._debug = debug(`${name}:Http`)
  }

  /**
   * Make a GET request.
   * @param {!string} [endpoint=''] - The endpoint to make the GET request to.
   * @param {?Object} [opts={}] - The options for the HTTP GET
   * request.
   * @param {?boolean} [raw=false] - Return json object.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  get(
    endpoint?: string = '',
    opts?: Object = {},
    raw?: boolean = false
  ): Promise<any | Error> {
    return this.request('GET', endpoint, opts, raw)
  }

  /**
   * Make a POST request.
   * @param {!string} [endpoint] - The endpoint to make the POST request to.
   * @param {?Object} [opts={}] - The options for the HTTP POST
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  post(
    endpoint: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    return this.request('POST', endpoint, opts)
  }

  /**
   * Make a PUT request.
   * @param {!string} [endpoint] - The endpoint to make the PUT request to.
   * @param {?Object} [opts={}] - The options for the HTTP PUT
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  put(
    endpoint: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    return this.request('PUT', endpoint, opts)
  }

  /**
   * Make a DELETE request.
   * @param {!string} [endpoint] - The endpoint to make the DELETE request to.
   * @param {?Object} [opts={}] - The options for the HTTP DELETE
   * request.
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  delete(
    endpoint: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    return this.request('DELETE', endpoint, opts)
  }

  /**
   * Handle the body response string.
   * @param {!string} body - The body to parse.
   * @param {?boolean} raw - Return the raw body.
   * @returns {Function|string} -  The raw body or the body parsed by
   * cheerio.
   */
  handleBody(body: string, raw?: boolean): Function | string {
    if (raw) {
      return body
    }

    return cheerio.load(body)
  }

  /**
   * Print the debug message.
   * @param {!string} method - The method of the HTTP request.
   * @param {!string} uri - The uri of the HTTP request.
   * @param {?Object} opts=this._opts - The options for the HTTP request.
   * @returns {undefined}
   */
  printDebug(method: string, uri: string, opts?: Object): void {
    let msg = `Making ${method} request to: ${uri}`
    if (opts) {
      const { body, query, form } = opts
      const s = {
        ...body,
        ...query,
        ...form
      }
      msg += `?${stringify(s)}`
    }

    this._debug(msg)
  }

}
