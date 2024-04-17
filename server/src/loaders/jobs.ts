import cron from 'node-cron'
import { callNeonFaucet } from '../helpers/neonFaucet'

export const scheduleJobs = async () => {
  // Cron job to call the function every 2 minutes
  cron.schedule('*/10 * * * *', () => {
    console.log('Calling Neon Faucet')
    callNeonFaucet()
  })
}
