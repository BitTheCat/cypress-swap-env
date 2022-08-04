let fs = require('fs');

module.exports = {
    check()
    {
        if (!fs.existsSync('.env.backup') || fs.existsSync('.env.cypress')) {
            throw new Error('***************************************\n' +
                '   DANGER! Cannot found .env swap!\n' +
                '   >> Run node cypress/swapEnv.js\n' +
                '*****************************************\n'
            )
        }
        return null
    }
}
