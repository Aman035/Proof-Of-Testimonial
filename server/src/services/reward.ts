import { writeContract } from '../helpers/contract'

export const claimReward = async (address: string) => {
  return await writeContract('claimReward', [address])
}
