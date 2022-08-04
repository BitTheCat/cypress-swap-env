let fs = require('fs');

module.exports = {
    check()
    {
        if (!fs.existsSync('.env.backup') && fs.existsSync('.env.cypress') && fs.existsSync('.env')) {
            return true
        } else if (!fs.existsSync('.env.cypress') && fs.existsSync('.env.backup') && fs.existsSync('.env')) {
            return false
        } else {
            throw new Error('***************************************\n' +
                '   DANGER! Cannot found .env swap!\n' +
                '*****************************************\n'
            )
        }
    },
    swap() {
        let message = ''

        if (fs.existsSync('.env.cypress')) {
            renameEnv(undefined, '.env.cypress')
            message = 'Swap Done! Swap .env'
        } else if (fs.existsSync('.env.backup')) {
            renameEnv(undefined, '.env.cypress', undefined, true)
            message = 'Swap Done! Restore old .env'
        } else {
            throw new Error('***************************************\n' +
                '   DANGER! Cannot found .env.cypress or .env.backup\n' +
                '*****************************************\n'
            )
        }

        console.info(message)
    }
}

function renameEnv(
    env = '.env',
    secondaryEnv = '.env.cypress',
    backup = '.env.backup',
    rollback = false
)
{
    fs.renameSync(env, rollback ? secondaryEnv : backup);
    fs.renameSync(rollback ? backup : secondaryEnv, env);
}