# Cypress Swap Env

![](https://img.shields.io/badge/swapEnv-ff4d00?logoColor=white&style=flat-square)

### Why?
<hr>

This repository contains some files you can integrate into your project that uses Cypress with a specific .env (e.g., .env.cypress).

The code consists of a script that allows you to swap between the default .env and the one dedicated to Cypress.
In the event that the swap was not made when Cypress is first launched, the module will throw an error informing you to make the swap.


I use this script and check along with the __[Laracast/cypress](https://github.com/laracasts/cypress)__ library that provides a swap of the.env before each test run (spec) and many Laravel/Cypress integration commands.
The reason arises from the fact that with __VITE__ running as dev and so many tests running the latter shuts down resulting in failure of subsequent tests.

### ___Attention___

If you run the tests via console the script succeeds in performing the full swap, if you use cypress open instead it succeeds in performing only the first swap.

### Install
<hr>

Requirements

I you don't have cypress yet just install it
```
npm install cypress --save-dev
```

1 - Copy the __swap.js__ file under the main Cypress folder.

2 - Now copy the __swap-plugin.js__ file under the cypress/plugins/ folder.

3 - Let's open the cypress.config.js file and edit it by adding these lines inside e2e

```js
const swapEnv = require('./cypress/plugins/swap-plugin.js')

e2e: {
    experimentalInteractiveRunEvents: true,
    setupNodeEvents(on, config) {
        on('before:run', () => {
            if (swapEnv.check()) {
                swapEnv.swap()
            }
        })
        on('after:run', () => {
            swapEnv.swap()
        })
        on('task', {
            swapEnv
        });
    return config
    },
}
```

4 - Now all we have to do is go and edit the e2e.js file under the cypress/support folder as follows

```js
before(() => {
    cy.task('swapEnv.check', {}, { log: false });
});
```

### Script
<hr>

To run the command from the terminal, simply run the following code

```
node cypress/swapEnv.js
```
