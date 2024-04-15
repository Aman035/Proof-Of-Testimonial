import {
  IndexService,
  OffChainSignType,
  SignProtocolClient,
  SpMode,
} from '@ethsign/sp-sdk'
import { PrivateKeyAccount } from 'viem'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOffChainClient = (signer: PrivateKeyAccount) => {
  return new SignProtocolClient(SpMode.OffChain, {
    signType: OffChainSignType.EvmEip712,
    account: signer,
    rpcUrl: 'https://testnet-rpc.sign.global/api',
  })
}

export const getAttestation = async (attestationId: string) => {
  const indexService = new IndexService('testnet')
  return await indexService.queryAttestation(attestationId)
}

/**
 * Get Latest Attestation from a attestor in a particular schema
 */
export const getLatestAttestation = async (
  schemaId: string,
  attester: string
) => {
  const indexService = new IndexService('testnet')
  const attestations = await indexService.queryAttestationList({
    attester,
    schemaId,
    page: 1,
  })
  if (attestations.rows.length > 0) {
    return attestations.rows[0]
  } else return null
}

/**
 * Create Attestation for a particular schema
 */
export const createAttestation = async (
  schemaId: string,
  client: SignProtocolClient,
  data: { [key: string]: string },
  linkedAttestationId: string | null | undefined,
  indexingValue: string
) => {
  return await client.createAttestation({
    schemaId,
    data,
    indexingValue,
    linkedAttestationId,
  })
}

export const getAttestations = async (
  schemaId: string,
  page: number,
  indexingValue?: string
) => {
  const indexService = new IndexService('testnet')
  return await indexService.queryAttestationList({
    schemaId,
    indexingValue,
    page: page,
  })
}
