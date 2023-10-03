// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// I think this is an outdated way to create a task and the plugins way works better
// Cypress.Commands.overwrite('task', (taskName, data) => {
//     if (taskName === 'nock') {
//       // Simulate fetching user data from an external source
//       nock.activate()
//       console.log(`nock will intecept`)
//       nock(`https://restcountries.com/v3.1/`).get('all').reply(200, {"test": 'I am mocked'})
//       return null
//     }
//     if (taskName === 'clearNock') {
//         nock.restore()
//         nock.cleanAll()
//         return null
//     }
// })