import { gql } from '@apollo/client'

export const whitelistUser = gql(/* GraphQL */ `
  mutation whitelist($address: ID!) {
    whitelist(address: $address)
  }
`)
