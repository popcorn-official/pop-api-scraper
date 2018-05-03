# pop-api-scraper

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]
[![Conventional Commits][commits-image]][commits-url]

[travis-image]: https://travis-ci.org/popcorn-official/pop-api-scraper.svg?branch=master
[travis-url]: https://travis-ci.org/popcorn-official/pop-api-scraper
[coveralls-image]: https://coveralls.io/repos/github/popcorn-official/pop-api-scraper/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/popcorn-official/pop-api-scraper?branch=master
[david-image]: https://david-dm.org/popcorn-official/pop-api-scraper.svg
[david-url]: https://david-dm.org/popcorn-official/pop-api-scraper
[david-dev-image]: https://david-dm.org/popcorn-official/pop-api-scraper/dev-status.svg
[david-dev-url]: https://david-dm.org/popcorn-official/pop-api-scraper?type=dev
[commits-image]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg
[commits-url]: https://conventionalcommits.org
## Features

The pop-api-scraper project aims to provide the core modules for the
[`popcorn-api`](https://github.com/popcorn-official/popcorn-api) scraper, but
can also be used for other purposes by using middleware.
 - Strategy pattern with providers
 - Cronjobs
 - Scraper wrapper class
 - HttpService with [`got`](https://github.com/sindresorhus/got)

## Installation

```
 $ npm install --save pop-api-scraper pop-api
```

## Documentation

 - [General documentation](https://popcorn-official.github.io/pop-api-scraper/manual/index.html)
 - [Api docs](https://popcorn-official.github.io/pop-api-scraper/identifiers.html)
 - [Usage](https://popcorn-official.github.io/pop-api-scraper/manual/usage.html)
 - [Middleware](https://popcorn-official.github.io/pop-api-scraper/manual/middleware.html)

## Usage

For the basic setup you need to create a `Provider` (strategy) the
`PopApiScraper` instance can use. The `PopApiScraper` implements the strategy
pattern, where the providers are the strategies.

The example below makes a HTTP GET request to a web service or website. from
there on you are free to implement how and what data you want to get from it.

```js
// ./ExampleProvider.js
import { AbstractProvider, HttpService } from 'pop-api-scraper'

// Extend from the internal AbstractProvider.
export default class ExampleProvider extends AbstractProvider {

  constructor(PopApiScraper, {name, configs, maxWebRequests = 2}) {
    super(PopApiScraper, {name, configs, maxWebRequests})
  }

  // Override the `scrapeConfig` method to get the content from one
  // configuration.
  scrapeConfig(config) {
    // A HTTP service to send HTTP requests.
    this.httpService = new HttpService({
      baseUrl: config.baseUrl
    })

    // HTTP  GET request to: https://jsonplaceholder.typicode.com/posts?foo=bar
    return this.httpService.get('/posts', config.httpOptions)
      .then(res => res.data)
  }

}
```

Bundle it all up together with
[`pop-api`](https://github.com/popcorn-official/pop-api):

```js
// ./index.js
import os from 'os'
import { PopApi } from 'pop-api'
import { join } from 'path'
import { Cron, PopApiScraper } from 'pop-api-scraper'

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
```

## License

MIT License
