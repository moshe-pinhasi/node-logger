const winston = require('winston');

const fs = require('fs');
const logsdir = './logs';

//define the time format
const timeFormatFn = function() {
  let now = new Date();
  return now.toUTCString();
};

if (!fs.existsSync(logsdir)){
  fs.mkdirSync(logsdir);
}

var config = winston.config;
let logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      colorize: false,
      json: true,
      stringify: false,
      timestamp: timeFormatFn,
      formatter: function(options) {
        return options.timestamp() + ' ' +
          config.colorize(options.level, options.level.toUpperCase()) + ' ' +
          (options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ],
  exitOnError: false
});

class Logger {

  debug(message, meta) {
    logger.log("debug", message, meta? meta : "")
  }

  info(message, meta) {
    logger.log("info", message, meta? meta : "")
  }

  warn(message, meta) {
    logger.log("warn", message, meta? meta : "")
  }

  error(message, meta) {
    logger.log("error", message, meta? meta : "")
  }
}

module.exports = new Logger()
