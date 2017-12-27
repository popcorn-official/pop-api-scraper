// Import the necessary modules.
// @flow
import { IProvider } from './providers'

/**
 * Base context for the strategy pattern.
 * @type {Context}
 */
export default class Context {

  /**
   * The provider of the context to execute.
   * @type {IProvider}
   */
  provider: IProvider

  /**
   * Create a new Context object.
   * @param {?IProvider} [provider=new IProvider()] - The provider of the
   * context to execute.
   */
  constructor(provider: IProvider = new IProvider()): void {
    /**
     * The provider of the context to execute.
     * @type {IProvider}
     */
    this.provider = provider
  }

  /**
   * Execute the set provider.
   * @returns {Promise<Array<Object>, Error>} - A list of scraped content.
   */
  execute(): Promise<Array<Object> | Error> {
    return this.provider.scrapeConfigs()
  }

}
