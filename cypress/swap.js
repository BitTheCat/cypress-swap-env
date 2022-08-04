/*
 * Attributes
 *  oneSwap | Boolean
 */

let swap = require('plugins/swap-plugin.js');

const args = require('minimist')(process.argv.slice(2));
const oneSwap = getProp('oneSwap', 'boolean')

/* Init */
swap(oneSwap)

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