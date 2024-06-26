import { Application } from 'express'
import { expressLoader } from './express'
import logger from './logger'
import { apolloLoader } from './apolloServer'
// import { dbCreator } from './dbCreator'
import { scheduleJobs } from './jobs'

export const loaders = async (app: Application): Promise<void> => {
  const apolloServer = await apolloLoader()
  logger.info('Apollo server loaded ✅')
  expressLoader(app, apolloServer)
  logger.info('Express loaded ✅')
  // await dbCreator()
  // logger.info('Database created ✅')
  await scheduleJobs()
  logger.info('Jobs scheduled ✅')
}
