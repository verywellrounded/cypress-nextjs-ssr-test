const http = require('http')
const { parse } = require('url')
const next = require('next')
const nock = require('nock');
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
 
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handleNextRequests = app.getRequestHandler()
await app.prepare()

const customServer = new http.Server(async(req, res) => {
  return handleNextRequests(req, res)
})

await new Promise ((resolve, reject) => {
  customServer.listen(port,(err) => {
    if (err){
      return reject(err)
    }
    console.log(`> Ready on http://${hostname}:${port}`)
    resolve() // wonder if this is neccessary or can we create the serve the way next suggest below
  })
})
 
// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       // Be sure to pass `true` as the second argument to `url.parse`.
//       // This tells it to parse the query portion of the URL.
//       const parsedUrl = parse(req.url, true)
//       const { pathname, query } = parsedUrl
 
//       if (pathname === '/a') {
//         await app.render(req, res, '/a', query)
//       } else if (pathname === '/b') {
//         await app.render(req, res, '/b', query)
//       } else {
//         await handle(req, res, parsedUrl)
//       }
//     } catch (err) {
//       console.error('Error occurred handling', req.url, err)
//       res.statusCode = 500
//       res.end('internal server error')
//     }
//   })
//     .once('error', (err) => {
//       console.error(err)
//       process.exit(1)
//     })
//     .listen(port, () => {
      
//     })
// })

  on('task', 
  {
    clearNock: () => {
    nock.restore()
    nock.cleanAll()
    return null
  }
})
// Seems defining tasks in their own on function is necessary
on('task', 
  {
    nock: ({}) => {
      nock.activate()
      console.log(`nock will intecept`)
      // Adding persist to the function keeps all calls within a test resolving the mock
      nock(`https://restcountries.com/v3.1`).get('/all?name').reply(200, [{"name": {'common': 'I am mocked'}}, {"name": {'common': 'I am mocked too'}}])
      return null
    }
  })
}
