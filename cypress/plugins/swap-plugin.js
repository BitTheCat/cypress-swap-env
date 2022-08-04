let fs = require('fs');

module.exports = {
    check()
    {
        if (!fs.existsSync('.env.backup') || fs.existsSync('.env.cypress')) {
            throw new Error('***************************************\n' +
                '   DANGER! Cannot found .env swap!\n' +
                '   >> Run node cypress/swap.js\n' +
                '*****************************************\n'
            )
        }
        return null
    },
    swap(oneSwap = false) {
        let message = ''

        if(oneSwap) {
            if(!fs.existsSync('.env.backup')) {
                renameEnv(undefined, '.env.cypress')
                console.info('Swap Done! Swap .env')
                return
            }
            console.info('The oneSwap argument was set, swap not performed!')
            return
        }

        if (fs.existsSync('.env.cypress')) {
            renameEnv(undefined, '.env.cypress')
            message = 'Swap Done! Swap .env'
        } else if (fs.existsSync('.env.backup')) {
            renameEnv(undefined, '.env.cypress', undefined, true)
            message = 'Swap Done! Restore old .env'
        } else {
            message = 'DANGER! Cannot found .env.cypress or .env.backup'
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