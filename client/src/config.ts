import { abi } from './abi'
import { tokenAbi } from './tokenAbi'

export const config = {
  profileSchemaId: 'SPS_zhkwtSjrbPAoC3eqW0hYV',
  productSchemaId: 'SPS_Q36c9ZNrfHsgz6B4zu-yA',
  testimonialSchemaId: 'SPS_5GQyk-P8gyd1gX3_CW3Tk',
  voteSchemaId: 'SPS_Qpv1GmWVWUZeFY-Ge3A_f',
  contractAddress: '0x3311c551E1F45A2DD7f072ef0a8f2406DE7058bF',
  contractAbi: abi,
  tokenContractAddress: '0x6F00B392d6EB7513851551c57Ce58d915aaa0373',
  tokenAbi: tokenAbi,
  serverUrl: import.meta.env.VITE_POT_SERVER_URL,
}
