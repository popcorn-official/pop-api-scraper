/* eslint-disable no-console */
import os from 'os'
import { PopApi } from 'pop-api'
import { join } from 'path'
import { Cron, PopApiScraper } from '../src'

import ExampleProvider from './ExampleProvider'

(async () => {
  try {
    // Let the PopApiScraper use the ExampleProvider o scrape data.
    PopApiScraper.use(ExampleProvider, {
      name: 'example-provider',
      configs: [{
        baseUrl: 'https://jsonplaceholder.typicode.com',
        httpOptions: {
          query: {
            foo: 'bar'
          }
        }
      }],
      maxWebRequests: 2
    })

    // Register the PopApiScraper middleware to the pop-api instance.
    PopApi.use(PopApiScraper, {
      statusPath: join(...[os.tmpdir(), 'status.json']),
      updatedPath: join(...[os.tmpdir(), 'updated.json'])
    })
    // Optionally you can use the Cron middleware to scrape for content on a
    // regulat basis.
    PopApi.use(Cron, {
      cronTime: '0 0 */6 * * *',
      start: false
    })

    // PopApi now has a `scraper` instance.
    const res = await PopApi.scraper.scrape()
    console.info(res[0])
  } catch (err) {
    console.error(err)
  }
})()
