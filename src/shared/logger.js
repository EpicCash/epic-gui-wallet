/*const log = require('electron-log');
//import { join } from 'path'
import { logLevel} from './config'
//const moment = require('moment');

//let logFile = `${moment(new Date()).format('YYYY_MM_D')}.log`
//let logPath = join(logDir, logFile)

//log.transports.file.file = logPath
log.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s}:{ms} [{level}] {text}'
log.transports.file.maxSize = 5 * 1024 * 1024
log.transports.file.level = logLevel
log.transports.file.streamConfig = {flags: 'w'};
log.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s}:{ms} [{level}] {text}'
log.transports.console.level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'
*/
//export default log
