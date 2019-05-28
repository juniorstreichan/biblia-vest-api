import winston from 'winston';

const {
  combine, timestamp, prettyPrint, simple, colorize,
} = winston.format;

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'DD/MM/YYYY hh:mm:ss' }), prettyPrint(), colorize()),
  transports: [new winston.transports.Console({ format: simple(), level: 'info' })],
});

export default logger;
