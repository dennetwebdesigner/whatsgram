import Helpers, { QS } from './helpers/index.js'
import './run-time/UserRunTime.js'
import './run-time/MessagerRunTime.js'

// verifica se usuario é valido
Helpers.authentification()

let from = null

console.log()