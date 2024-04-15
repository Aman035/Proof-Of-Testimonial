import axios from 'axios'
import { config } from '../config'

/**
 * REGISTER ADDRESS TO GITCOIN SCORER
 */
export const registerAddressToScorer = async (
  address: string
): Promise<number> => {
  const postData = {
    address: address,
    scorer_id: config.gitcoin.scorerId,
  }

  const apiConfig = {
    headers: {
      'X-API-KEY': config.gitcoin.apiKey,
      'Content-Type': 'application/json',
    },
  }

  return axios
    .post(`${config.gitcoin.url}registry/submit-passport`, postData, apiConfig)
    .then((response) => {
      return parseFloat(response.data.score)
    })
}

/**
 * GET GITCOIN SCORE FOR ADDRESS
 */
export const getGitcoinScore = async (address: string): Promise<number> => {
  const apiConfig = {
    headers: {
      'X-API-KEY': config.gitcoin.apiKey,
      'Content-Type': 'application/json',
    },
  }

  return axios
    .get(
      `${config.gitcoin.url}registry/score/${config.gitcoin.scorerId}/${address}`,
      apiConfig
    )
    .then((response) => {
      return parseFloat(response.data.score)
    })
}
