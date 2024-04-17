// import { connection } from '../db/connection'

// /**
//  * @dev -Create the database tables
//  */
// export const dbCreator = async () => {
//   const profileTableExists = await connection.schema.hasTable('profile')
//   if (!profileTableExists) {
//     await createProfileTable()
//   }
// }

// /**
//  * @dev - Create the profile table
//  */
// const createProfileTable = async () => {
//   await connection.schema.createTable('profile', (table) => {
//     table.text('address').notNullable().primary()
//     table.text('attestationId').notNullable()
//     table.timestamp('createdAt').notNullable().defaultTo(connection.fn.now())
//   })
// }
