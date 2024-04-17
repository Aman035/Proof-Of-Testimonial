import axios from 'axios'
import { config } from '../config'

export const callNeonFaucet = async () => {
  const url = 'https://api.neonfaucet.org/request_neon'
  const data = {
    amount: 100,
    wallet: config.account.address,
  }
  const apiConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const response = await axios.post(url, data, apiConfig)
    console.log('API Call Successful:', response.data)
  } catch (error: any) {
    console.error(
      'API Call Failed:',
      error.response ? error.response.data : error.message
    )
  }
}
