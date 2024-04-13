import knex from 'knex'
import logger from '../loaders/logger'

export const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/data/db.sqlite3',
  },
  useNullAsDefault: true,
})

connection.on('query', ({ sql, bindings }) => {
  const query = connection.raw(sql, bindings).toQuery()
  logger.info(`[db] ${query}`)
})
