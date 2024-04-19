import { abi } from './abi'
import { tokenAbi } from './tokenAbi'

export const config = {
  profileSchemaId: 'SPS_zhkwtSjrbPAoC3eqW0hYV',
  productSchemaId: 'SPS_Q36c9ZNrfHsgz6B4zu-yA',
  testimonialSchemaId: 'SPS_5GQyk-P8gyd1gX3_CW3Tk',
  voteSchemaId: 'SPS_Qpv1GmWVWUZeFY-Ge3A_f',
  contractAddress: '0x0fADd2245E62e3031bD8D05855278b3F6F68dC77',
  contractAbi: abi,
  tokenContractAddress: '0xCa82a36E97198A1953A88FBffbEc26C871fB859f',
  tokenAbi: tokenAbi,
  serverUrl: import.meta.env.VITE_POT_SERVER_URL,
}
