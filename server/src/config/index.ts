import dotenv from 'dotenv'
import { abi } from './abi'
dotenv.config()

export const config = {
  port: process.env.PORT || 3000,
  api: {
    prefix: '/api',
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  gitcoin: {
    thresholdScore: 1,
    scorerId: '7067',
    url: 'https://api.scorer.gitcoin.co/',
    apiKey: process.env.GITCOIN_API_KEY,
  },
  account: {
    address: '0x28F1C7B4596D9db14f85c04DcBd867Bf4b14b811',
    privateKey: process.env.PRIVATE_KEY,
  },
  contract: {
    abi: abi,
    address: '0x0fADd2245E62e3031bD8D05855278b3F6F68dC77',
  },
  signX: {
    testimonialSchemaId: 'SPS_5GQyk-P8gyd1gX3_CW3Tk',
    voteSchemaId: 'SPS_Qpv1GmWVWUZeFY-Ge3A_f',
  },
}
