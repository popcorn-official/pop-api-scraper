// @flow
import cron from 'node-cron'

/**
 * Cron class for executing the scraper periodically.
 * @type {Cron}
 */
export default class Cron {

  /**
   * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
   * @type {string}
   */
  cronTime: string

  /**
   * Create a new Cron object.
   * @param {!PopApi} PopApi - The PopApi instance.
   * @param {!Object} [options={}] - The options for the Cron middleware.
   * @param {!string} [options.cronTime=0 0 *\/6 * * *] - The cron tab to
   * execute the scraper.
   * @param {?boolean} [options.start=false] - Start the cronjob on creation.
   */
  constructor(PopApi: any, {
    cronTime = '0 0 */6 * * *',
    start = false,
  }: Object = {}): void {
    const { name } = this.constructor
    PopApi.debug(`Registering ${name} with options: %o`, {
      cronTime,
      start,
    })

    /**
     * The cron time for scraping audios. Default is `0 0 *\/6 * * *`.
     * @type {string}
     */
    this.cronTime = cronTime
    PopApi.cron = this.getCron(PopApi, start)
  }

  /**
   * Get the cron job to run.
   * @param {!PopApi} PopApi - The PopApi instance.
   * @param {?boolean} [start] - Start the cron job.
   * @returns {Object} - A configured cron job.
   */
  getCron(PopApi: any, start?: boolean): Object {
    if (start) {
      PopApi.scraper.scrape()
    }

    return cron.schedule(
      this.cronTime,
      PopApi.scraper.scrape,
      {
        scheduled: start,
      },
    )
  }

}
