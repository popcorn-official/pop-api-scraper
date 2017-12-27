// @flow

/**
 * Interface to send HTTP requests.
 * @interface
 * @type {IHttpService}
 */
export default class IHttpService {

  /**
   * Make a GET request.
   * @param {!string} [endpoint] - The endpoint to make the GET request to.
   * @param {?Object} [opts={}] - The options for the HTTP GET
   * request.
   * @param {?boolean} [raw=false] - Return json object.
   * @throws {Error} - Using default method: 'get'
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  get(
    endpoint: string,
    opts?: Object = {},
    raw?: boolean = false
  ): Promise<any | Error> {
    throw new Error('Using default method: \'get\'')
  }

  /**
   * Make a POST request.
   * @param {!string} [endpoint] - The endpoint to make the POST request to.
   * @param {?Object} [opts={}] - The options for the HTTP POST
   * request.
   * @throws {Error} - Using default method: 'post'
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  post(
    endpoint: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    throw new Error('Using default method: \'post\'')
  }

  /**
   * Make a PUT request.
   * @param {!string} [endpoint] - The endpoint to make the PUT request to.
   * @param {?Object} [opts={}] - The options for the HTTP PUT
   * request.
   * @throws {Error} - Using default method: 'put'
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  put(
    endpoint: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    throw new Error('Using default method: \'put\'')
  }

  /**
   * Make a DELETE request.
   * @param {!string} [endpoint] - The endpoint to make the DELETE request to.
   * @param {?Object} [opts={}] - The options for the HTTP DELETE
   * request.
   * @throws {Error} - Using default method: 'delete'
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  delete(
    endpoint: string,
    opts?: Object = {}
  ): Promise<any | Error> {
    throw new Error('Using default method: \'delete\'')
  }

  /**
   * Request to download an item.
   * @param {!string} endpoint - The uri to the item.
   * @param {!string} filePath - The name of the file to save the item.
   * @throws {Error} - Using default method: 'download'
   * @returns {Promise<string, Error>} - Message when it's finally downloaded.
   */
  download(endpoint: string, filePath: string): Promise<string | Error> {
    throw new Error('Using default method: \'download\'')
  }

  /**
   * Print the debug message.
   * @param {!string} method - The method of the HTTP request.
   * @param {!string} uri - The uri of the HTTP request.
   * @param {?Object} opts=this._opts - The options for the HTTP request.
   * @throws {Error} - Using default method: 'printDebug'
   * @returns {undefined}
   */
  printDebug(method: string, uri: string, opts?: Object): void {
    throw new Error('Using default method: \'printDebug\'')
  }

  /**
   * Make a HTTP request.
   * @param {!string} method - The method of the HTTP request.
   * @param {!string} [endpoint] - The endpoint to make the HTTP request to.
   * @param {?Object} [opts] - The options for the HTTP request.
   * @param {?boolean} [raw] - Return the raw body.
   * @throws {Error} - Using default method: 'request'
   * @returns {Promise<Object, Error>} - Promise with the HTML loaded in
   * cheerio.
   */
  request(
    method: string,
    endpoint: string,
    opts?: Object,
    raw?: boolean
  ): Promise<any | Error> {
    throw new Error('Using default method: \'request\'')
  }

}
