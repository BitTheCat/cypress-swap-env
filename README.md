# Cypress Swap Env

![](https://img.shields.io/badge/swapEnv-ff4d00?logoColor=white&style=flat-square)

### Why?
<hr>

This repository contains some files you can integrate into your project that uses Cypress with a specific .env (e.g., .env.cypress).

The code consists of a script that allows you to swap between the default .env and the one dedicated to Cypress.
In the event that the swap was not made when Cypress is first launched, the module will throw an error informing you to make the swap.



I use this script and check along with the __[Laracast/cypress](https://github.com/laracasts/cypress)__ library that provides a swap of the.env before each test run (spec) and many Laravel/Cypress integration commands.
The reason arises from the fact that with __VITE__ running as dev and so many tests running the latter shuts down resulting in failure of subsequent tests.

### Install
<hr>

Requirements

I you don't have cypress yet just install it
```
npm install cypress --save-dev
```
Minimist is require for swapEnv.js script

```
npm i minimist
```

1 - Copy the swapEnv.js file under the main Cypress folder.

2 - Now copy the swapEnvModule.js file under the cypress/plugins/ folder.

If you are using the index.js file under the plugins folder then follow the following otherwise go to step 3.b

3.a - Once this is done, you need to edit the index.js file in the plugins folder like this:

```
const swapEnv = require('./swapEnvModule.js')

module.exports = (on, config) => {
    on('task', {
        swapEnv,
    });
    return config
};

```

3.b - Let's open the cypress.config.js file and edit it by adding these lines inside e2e -> setupNodeEvents

```
on('task', {
   swapEnv,
});
```

4 - Now all we have to do is go and edit the e2e.js file under the cypress/support folder as follows

```
before(() => {
    cy.task('swapEnv.check', {}, { log: false });
});
```

### Optional
<hr>

Adding the npm script inside __package.js__ to start cypress with the env swap

```
"cypress": "node cypress/swapEnv.js --oneSwap=true && npx cypress open",
```

### Script
<hr>

To run the command from the terminal, simply run the following code

```
node cypress/swapEnv.js {args}
```

#### Script arguments

__oneSwap__: boolean, if it is set the script will not swap if it has already been swapped
