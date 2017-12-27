// @flow

/**
 * Interface for scraping and content from various sources.
 * @interface
 * @type {IProvider}
 */
export default class IProvider {

  /**
   * Get the contents for a configuration.
   * @param {!Object} config - The config to get content with.
   * @abstract
   * @throws {Error} - Using default method: '_scrapeConfig'
   * @returns {Promise<Array<Object>, Error>} - The results of a configuration.
   */
  scrapeConfig(config: Object): Promise<Array<Object> | Error> {
    throw new Error('Using default method: \'scrapeConfig\'')
  }

  /**
   * Get the contents for the configurations.
   * @abstract
   * @throws {Error} - Using default method: 'scrapeConfigs'
   * @returns {Promise<Array<Object>, Error>} - The results of the scrape
   * configurations.
   */
  scrapeConfigs(): Promise<Array<Object> | Error> {
    throw new Error('Using default method: \'scrapeConfigs\'')
  }

}
