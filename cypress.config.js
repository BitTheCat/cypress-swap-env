const { defineConfig } = require('cypress');
const swapEnv = require('./cypress/plugins/swap-plugin.js')

module.exports = defineConfig({
    projectId: 'YourProjectId',
    //other config

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
        baseUrl: 'YourBaseUrl',
        specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    },
});
