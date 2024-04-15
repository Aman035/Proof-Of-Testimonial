import { GraphQLError } from 'graphql'
import { Resolvers } from './generated/schema'
import { checkWhitelistEligibility, whitelist } from '../services/whitelist'

export const resolvers: Resolvers = {
  Query: {
    checkWhitelistEligibility: async (_root, { address }) => {
      return await checkWhitelistEligibility(address)
    },
  },
  Mutation: {
    whitelist: async (_root, { address }) => {
      try {
        return await whitelist(address)
      } catch (e) {
        throw new GraphQLError((e as Error).message, {
          extensions: { code: 'BAD_REQUEST' },
        })
      }
    },
  },
}
