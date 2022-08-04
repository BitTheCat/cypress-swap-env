const swapEnv = require('./swapEnvModule.js')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    on('task', {
        swapEnv,
    });
    return config
};
