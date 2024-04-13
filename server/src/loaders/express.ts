import express, { NextFunction, Request, Response, Application } from 'express'
import cors from 'cors'
import routes from '../api'
import { config } from '../config'
import helmet from 'helmet'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server'
import { GraphQLResolveInfo } from 'graphql'

export const expressLoader = (
  app: Application,
  apolloServer: ApolloServer<GraphQLResolveInfo>
): void => {
  /* Health Check endpoint */
  app.get('/status', (req: Request, res: Response) => {
    res.sendStatus(200)
  })

  /**
   * Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
   * Helps avoiding logging the proxy IP as the client IP
   */
  app.enable('trust proxy')

  /* Middleware that helps you secure your Express apps by setting various HTTP headers */
  /** @notice - Custom Config for working of apolloServer Playground */
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    })
  )

  /**
   * Middleware that allow Cross Origin resourse sharing for all origins by default
   * Tells browsers to allow or deny loading resources from a given origin
   */
  app.use(cors())

  /* Middleware that transforms the raw string of req.body into json */
  app.use(express.json())

  /* Load API routes */
  app.use(config.api.prefix, routes())

  /**
   * Apply Middleware to graphQl Route
   * Context is passed to the graphql resolvers ( used to pass any custom data to resolvers )
   * @notice - This context is passed to the resolvers so that access to graphql mutations can be set to only authenticated users
   */
  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }): Promise<any> => {
        /**
         * Can be used for multiple purposes such as Data Loaders, Authentication, etc
         */
        const context = {}
        return context
      },
    })
  )

  /**
   * Handling 404 routes
   * If no route is matched by now, it must be a 404
   */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Not Found' })
  })
}
