const { defineConfig } = require('cypress');

module.exports = defineConfig({
    projectId: 'YourProjectId',
    //other config

    e2e: {
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config);
            //OR if you don't use index.js under plugins just
            //on('task', {
            //    swapEnv,
            //});
            //return config
        },
        baseUrl: 'YourBaseUrl',
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    },
});
