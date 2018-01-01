// Import the necessary modules.
// @flow
import fs from 'fs-extra'
import pMap from 'p-map'
import { isMaster } from 'cluster'

import Context from './Context'

/** @external {PopApi} https://github.com/ChrisAlderson/pop-api */

/**
 * Class for Initiating the scraping process.
 * @type {PopApiScraper}
 */
export default class PopApiScraper {

  /**
   * The context to execute the providers in.
   * @type {Context}
   */
  context: Context

  /**
   * The path of the status file. Default is `./tmp/status.json`.
   * @type {string}
   */
  statusPath: string

  /**
   * The path of the updated file. Default is `./tmp/updated.json`.
   * @type {string}
   */
  updatedPath: string

  /**
   * A map of the installed plugins.
   * @type {Map<any>}
   */
  static _installedPlugins: Map<string, any> = new Map()

  /**
   * Create a new BaseScraper object.
   * The base modules for popcorn-api
   * @param {!PopApi} PopApi - The PopApiScraper instance.
   * @param {!Object} options - The options for the BaseScraper middleware.
   * @param {!string} options.statusPath = - The path of the status file.
   * @param {!string} options.updatedPath - The path of the updated file.
   */
  constructor(PopApi: any, {
    statusPath,
    updatedPath
  }: Object): void {
    const { name } = this.constructor
    PopApi.debug(`Registering ${name} with options: %o`, {
      statusPath,
      updatedPath
    })

    if (!statusPath || !updatedPath) {
      throw new TypeError('\'statusPath\' and \'updatedPath\' are required options for the PopApiScraper middleware!')
    }

    /**
     * The context to execute the providers in.
     * @type {Context}
     */
    this.context = new Context()
    /**
     * The path of the status file. Default is `./tmp/status.json`.
     * @type {string}
     */
    this.statusPath = statusPath
    /**
     * The path of the updated file. Default is `./tmp/updated.json`.
     * @type {string}
     */
    this.updatedPath = updatedPath

    if (isMaster) {
      fs.createWriteStream(this.statusPath).end()
      fs.createWriteStream(this.updatedPath).end()
    }

    PopApi.scraper = this
  }

  /**
   * Get the status object.
   * @returns {Promise<string, Error>} - The status of the scraping process.
   */
  getStatus(): Promise<string | Error> {
    return fs.readFile(this.statusPath, 'utf8')
  }

  /**
   * Updates the `status.json` file.
   * @param {!string} status - The status which will be set to in the
   * `status.json` file.
   * @returns {Promise<undefined, Error>} - 'ok' if saved, or the error is there
   * is one.
   */
  setStatus(status: string): Promise<string | Error> {
    return fs.writeFile(this.statusPath, status, 'utf8')
  }

  /**
   * Get the updated object.
   * @returns {Promise<number, Error>} - The status of the scraping process.
   */
  getUpdated(): Promise<number | Error> {
    return fs.readFile(this.updatedPath, 'utf8')
      .then(res => Number(res))
  }

  /**
   * Updates the `updated.json` file.
   * @param {!number} updated - The epoch time when the API last started
   * scraping.
   * @returns {Promise<undefined, Error>} - 'ok' if saved, or the error is there
   * is one.
   */
  setUpdated(updated: number): Promise<string | Error> {
    return fs.writeFile(this.updatedPath, String(updated), 'utf8')
  }

  /**
   * Register middleware for the PopApi framework.
   * @param {!Function} Plugin - The plugin to use.
   * @param {!Object} args - The arguments passed down to the constructor of
   * the plugin.
   * @returns {Promise<PopApiScraper>} - The PopApi instance with the installed
   * plugins.
   */
  static use(Plugin: any, ...args: any): any {
    if (PopApiScraper._installedPlugins.has(Plugin)) {
      return this
    }

    const plugin = typeof Plugin === 'function'
      ? new Plugin(this, ...args)
      : null

    if (plugin) {
      PopApiScraper._installedPlugins.set(Plugin, plugin)
    }

    return this
  }
  /**
   * Initiate the scraping.
   * @param {!number} [concurrency=1] - How many providers to scrape
   * concurrently.
   * @returns {Promise<Array<Object>, Error>} - The array of the scraped
   * content.
   */
  async scrape(concurrency?: number = 1): Promise<Array<Object> | Error> {
    await this.setUpdated(Math.floor(new Date().getTime() / 1000))
    const providers = PopApiScraper._installedPlugins.values()

    const res = await pMap(providers, async provider => {
      this.context.provider = provider
      await this.setStatus(`Scraping: ${provider.name}`)

      return this.context.execute()
    }, { concurrency })
    await this.setStatus('idle')

    return res
  }

}
