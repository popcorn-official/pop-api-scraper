# Middleware

 - [Scraper](#scraper)
 - [Cron](#cron)

## Scraper

The `PopApiScraper` middleware implements a strategy pattern where you can
use your own `Providers` (strageties) for scraping content from the web.

```js
import os from 'os'
import { PopApi } from 'pop-api'
import { PopApiScraper } from 'pop-api-scraper'
import { join } from 'path'

import ExampleProvider  from './ExampleProvider'

const providerOpts = {
  name: 'example-provider',  // The name of the provider.
  configs: [{                // The configurations to scrape with.
    key: 'value'             // Put anything you like into the configuration.
  }],
  maxWebRequests: 2          // The maximum concurrent web requests at a time.
}
PopApiScraper.use(ExampleProvider, providerOpts)

// Join paths for the scraper options.
const tmpDir = join(...[os.tmpdir(), name])
const statusPath = join(...[tmpDir, 'status.json'])
const updatedPath = join(...[tmpDir, 'updated.json'])

const scraperOpts = {
  statusPath,  // The path to the status file where the scraper status is
               // saved.
  updatedPath  // The path to the updated file where the time of the scraping
               // process is saved.
}
PopApi.use(PopApiScraper, scraperOpts)

// Start the scraping process by calling the `scrape` method.
PopApi.scraper.scrape()
```

## Cron

The `Cron` middleware allows for the scraping process to be started regularly.

```js
import { PopApi } from 'pop-api'
import { Cron } from 'pop-api-scraper'

const cronOpts = {
  cronTime: '0 0 */6 * * *',  // The ctron time for the cronjob.
  start: false                // Start the cron job on creation.
}
PopApi.use(Cron, cronOpts)

// PopApi.cron will be an instance of: https://github.com/merencia/node-cron
```
