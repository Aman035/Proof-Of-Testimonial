import { abi } from './abi'
import { tokenAbi } from './tokenAbi'

export const config = {
  profileSchemaId: 'SPS_zhkwtSjrbPAoC3eqW0hYV',
  productSchemaId: 'SPS_Q36c9ZNrfHsgz6B4zu-yA',
  testimonialSchemaId: 'SPS_5GQyk-P8gyd1gX3_CW3Tk',
  voteSchemaId: 'SPS_Qpv1GmWVWUZeFY-Ge3A_f',
  contractAddress: '0x1028FE36D0AFe0cf1f9603E7165c0476c85eEcfe',
  contractAbi: abi,
  tokenContractAddress: '0x9123b786E10DAE41F9d4D2Dc5A0339D85f242272',
  tokenAbi: tokenAbi,
  serverUrl: import.meta.env.VITE_POT_SERVER_URL,
}
