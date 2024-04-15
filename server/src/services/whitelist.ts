import { writeContract } from '../helpers/contract'
import { config } from '../config'
import { getGitcoinScore, registerAddressToScorer } from '../helpers/gitcoin'

export const whitelist = async (address: string) => {
  const gitcoinScore = await getGitcoinScore(address)
  if (gitcoinScore < config.gitcoin.thresholdScore) {
    throw new Error(
      `Gitcoin score is less than ${config.gitcoin.thresholdScore}`
    )
  }
  return await writeContract('whitelist', [address])
}

export const checkWhitelistEligibility = async (address: string) => {
  const gitcoinScore = await registerAddressToScorer(address)
  return {
    score: gitcoinScore,
    isEligible: gitcoinScore >= config.gitcoin.thresholdScore,
  }
}
