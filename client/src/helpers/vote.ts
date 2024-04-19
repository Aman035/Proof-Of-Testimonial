import { readContract } from '@wagmi/core'
import { config } from '../config'
import { config as wagmiConfig } from '../App'

export const getVotes = async (testimonialId: string, address: string) => {
  const upvotes = await readContract(wagmiConfig, {
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'getUpvotes',
    args: [testimonialId],
  })

  const downvotes = await readContract(wagmiConfig, {
    abi: config.contractAbi,
    address: config.contractAddress as `0x${string}`,
    functionName: 'getDownvotes',
    args: [testimonialId],
  })

  const upvoted = address
    ? await readContract(wagmiConfig, {
        abi: config.contractAbi,
        address: config.contractAddress as `0x${string}`,
        functionName: 'upvoted',
        args: [testimonialId, address],
      })
    : false

  const downvoted = address
    ? await readContract(wagmiConfig, {
        abi: config.contractAbi,
        address: config.contractAddress as `0x${string}`,
        functionName: 'downvoted',
        args: [testimonialId, address],
      })
    : false

  return {
    upvotes: Number(upvotes),
    downvotes: Number(downvotes),
    upvoted: upvoted as boolean,
    downvoted: downvoted as boolean,
  }
}
