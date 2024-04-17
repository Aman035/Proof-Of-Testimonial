import { GraphQLError } from 'graphql'
import { Resolvers } from './generated/schema'
import { checkWhitelistEligibility, whitelist } from '../services/whitelist'
import { addTestimonial, voteTestimonial } from '../services/testimonial'

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
    addTestimonial: async (_root, { testimonialAttestationId }) => {
      try {
        return await addTestimonial(testimonialAttestationId)
      } catch (e) {
        throw new GraphQLError((e as Error).message, {
          extensions: { code: 'BAD_REQUEST' },
        })
      }
    },
    voteTestimonial: async (_root, { voteAttestationId }) => {
      try {
        return await voteTestimonial(voteAttestationId)
      } catch (e) {
        throw new GraphQLError((e as Error).message, {
          extensions: { code: 'BAD_REQUEST' },
        })
      }
    },
  },
}
