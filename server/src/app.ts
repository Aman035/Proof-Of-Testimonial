import express from 'express'
import { loaders } from './loaders'
import { config } from './config'
import logger from './loaders/logger'

const Server = async () => {
  // Create Express server
  const app = express()

  // Loaders
  await loaders(app)

  // Start Express server
  app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port} 🚀`)
  })
}
Server()
