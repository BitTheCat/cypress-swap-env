/*
 * Attributes
 *  oneSwap | Boolean
 */

let fs = require('fs');

const args = require('minimist')(process.argv.slice(2));
const oneSwap = getProp('oneSwap', 'boolean')

/* Init */
swap()

/**
 * Swap env files
 */
function swap() {
    let message = ''

    if(oneSwap) {
        if(!fs.existsSync('.env.backup')) {
            renameEnv(undefined, '.env.cypress')
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

/**
 * GetProp with simple validation
 */
function getProp(
    name = '',
    type = 'string',
){
    let value = name in args ? args[name] : false

    if (type === 'boolean') {
        value = value === 'true'
    }

    return typeof value === type ? value : false
}
