// Import the necessary modules.
import {
  AbstractProvider,
  HttpService
} from '../src'

/**
 * Example provider extending the abstract provider.
 * @extends {AbstractProvider}
 * @type {ExampleProvider}
 */
export default class ExampleProvider extends AbstractProvider {

  /**
   * Create a nwe ExampleProvider object.
   * @param {!PopApiScraper} PopApiScraper - The PopApScraper instance.
   * @param {!Object} options - The options for the ExampleProvider.
   * @param {!Array<Object>} options.configs - The configurations of the
   * provider.
   * @param {!number} [maxWebRequests=2] - The max allowed concurrent web
   * requests.
   */
  constructor(PopApiScraper, {name, baseUrl, configs, maxWebRequests = 2}) {
    super(PopApiScraper, {name, baseUrl, configs, maxWebRequests})
  }

  /**
   * Get the contents for the configurations.
   * @override
   * @returns {Promise<Array<Object>, Error>} - The results of the scraped
   * configurations.
   */
  scrapeConfig(config) {
    // A HTTP service to send HTTP requests.
    this.httpService = new HttpService({
      baseUrl: config.baseUrl
    })

    // HTTP  GET request to: 'https://jsonplaceholder.typicode.com/posts?foo=bar'
    return this.httpService.get('/posts', config.httpOptions)
      .then(res => res.data)
  }

}
