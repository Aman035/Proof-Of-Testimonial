import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { config } from '../config'

// Determine the appropriate log level based on the environment
const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug'

// Configuration of the logger
const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to each log entry
    winston.format.errors({ stack: true }), // Include stack trace for errors
    winston.format.json() // Format logs in JSON
  ),
  transports: [
    // Daily rotating file transport
    new DailyRotateFile({
      filename: 'application-%DATE%.log', // Pattern for the log file name
      datePattern: 'YYYY-MM-DD', // Date pattern for rotating
      maxSize: '20m', // Maximum size of the log file before rotating
      maxFiles: '14d', // Maximum age of a log file before it gets deleted
    }),
    // Separate file transport for error logs
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
})

// Custom format for console logging
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

// Console transport for non-production environments
if (config.nodeEnv !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize log level for console output
        winston.format.simple(), // Simple format for readability
        customFormat // Apply the custom format defined above
      ),
    })
  )
}

export default logger
