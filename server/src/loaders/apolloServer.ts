import { ApolloServer } from '@apollo/server'
import { readFile } from 'node:fs/promises'
import { resolvers } from '../graphql/resolvers'

export const apolloLoader = async () => {
  const typeDefs = await readFile('./src/graphql/schema.graphql', 'utf-8')
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  await server.start()
  return server
}
