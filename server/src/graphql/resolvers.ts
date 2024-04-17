import { GraphQLError } from 'graphql'
import { Resolvers } from './generated/schema'
import { checkWhitelistEligibility, whitelist } from '../services/whitelist'
import {
  addTestimonial,
  downvoteTestimonial,
  upvoteTestimonial,
} from '../services/testimonial'

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
    upvoteTestimonial: async (_root, { upvoteAttestationId }) => {
      try {
        return await upvoteTestimonial(upvoteAttestationId)
      } catch (e) {
        throw new GraphQLError((e as Error).message, {
          extensions: { code: 'BAD_REQUEST' },
        })
      }
    },
    downvoteTestimonial: async (_root, { downvoteAttestationId }) => {
      try {
        return await downvoteTestimonial(downvoteAttestationId)
      } catch (e) {
        throw new GraphQLError((e as Error).message, {
          extensions: { code: 'BAD_REQUEST' },
        })
      }
    },
  },
}
