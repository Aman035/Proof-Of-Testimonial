import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { config } from '../config'

const httpLink = createHttpLink({
  uri: config.serverUrl + '/graphql',
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
