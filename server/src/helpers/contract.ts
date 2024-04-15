import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { neonDevnet } from 'viem/chains'
import { config } from '../config'

const publicClient = createPublicClient({
  chain: neonDevnet,
  transport: http(),
})

const walletClient = createWalletClient({
  account: privateKeyToAccount(config.account.privateKey as `0x${string}`),
  chain: neonDevnet,
  transport: http(),
})

export const writeContract = async (functionName: string, args: any[]) => {
  return await walletClient.writeContract({
    address: config.contract.address as `0x${string}`,
    abi: config.contract.abi,
    functionName,
    args,
  })
}

export const readContract = async (functionName: string, args: any[]) => {
  return await publicClient.readContract({
    address: config.contract.address as `0x${string}`,
    abi: config.contract.abi,
    functionName,
    args,
  })
}
