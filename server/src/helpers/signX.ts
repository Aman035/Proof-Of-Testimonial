import { IndexService } from '@ethsign/sp-sdk'

const indexService = new IndexService('testnet')

export const getAttestation = async (attestationId: string) => {
  return await indexService.queryAttestation(attestationId)
}
