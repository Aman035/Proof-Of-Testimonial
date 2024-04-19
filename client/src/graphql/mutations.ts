import { gql } from '@apollo/client'

export const whitelistUser = gql(/* GraphQL */ `
  mutation whitelist($address: ID!) {
    whitelist(address: $address)
  }
`)

export const claimReward = gql(/* GraphQL */ `
  mutation claimReward($address: ID!) {
    claimReward(address: $address)
  }
`)

export const addTestimonial = gql(/* GraphQL */ `
  mutation AddTestimonial($testimonialAttestationId: ID!) {
    addTestimonial(testimonialAttestationId: $testimonialAttestationId)
  }
`)

export const voteTestimonial = gql(/* GraphQL */ `
  mutation VoteTestimonial($voteAttestationId: ID!) {
    voteTestimonial(voteAttestationId: $voteAttestationId)
  }
`)
