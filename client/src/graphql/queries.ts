import { gql } from '@apollo/client'

export const isEligible = gql(/* GraphQL */ `
  query checkWhitelistEligibility($address: ID!) {
    checkWhitelistEligibility(address: $address) {
      score
      isEligible
    }
  }
`)
