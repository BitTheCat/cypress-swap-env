// 

const swapEnv = require('./swapEnvModule.js')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    on('before:run', () => {
        swapEnv.swap()
    })
    on('after:run', () => {
        swapEnv.swap()
    })
    on('task', {
        swapEnv
    });
    return config
}