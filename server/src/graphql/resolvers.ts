import { GraphQLError } from 'graphql'
import { Resolvers } from './generated/schema'

export const resolvers: Resolvers = {
  Query: {
    profile: async (_root, { address }) => {
      const profile = {
        address,
        attestationId: '123',
        createdAt: '2021-01-01',
      }
      return profile
    },
  },
  Mutation: {
    createProfile: async (_root, { input: { address, attestationId } }) => {
      const profile = {
        address,
        attestationId,
        createdAt: '2021-01-01',
      }
      return profile
    },
    updateProfile: async (_root, { input: { address, attestationId } }) => {
      const profile = {
        address,
        attestationId,
        createdAt: '2021-01-01',
      }
      return profile
    },
  },
  /**
   * @dev - This is a resolver for the Profile type, here we can define how to resolve the fields of the Profile type.
   * @notice - This resolver will also override if date field was already present in the Profile type.
   */
  Profile: {
    createdAt: async (profile) => toIsoDate(profile.createdAt),
  },
}

const toIsoDate = (value: string) => {
  return value.slice(0, 'yyyy-mm-dd'.length)
}

/**
 * ERROR HANDLING
 */

const notFoundError = (message: string) => {
  throw new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  })
}

const unAuthorizedError = (message: string) => {
  throw new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  })
}

const badRequestError = (message: string) => {
  throw new GraphQLError(message, {
    extensions: { code: 'BAD_REQUEST' },
  })
}
