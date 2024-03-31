/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import express, { Application, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { apiMethods } from './middlewares/apiMethod'
import { requestQueryTransformer } from './middlewares/apiUtils'
import { ServerEnv } from '../interfaces'
import { Routes } from './v1/routes'
import * as swaggerUi from 'swagger-ui-express'
import * as fs from 'fs'
import * as path from 'path'
import { config } from '../infrastructure/env'
import { redisClient } from '../utils'

export class Server {
   private app: Application
   private v1_routes: Routes
   private env: ServerEnv
   private swaggerFile: string = path.resolve(
      __dirname + '/../swagger/swagger.json',
   )
   private swaggerData: string = fs.readFileSync(this.swaggerFile, 'utf8')
   private swaggerDocument: swaggerUi.JsonObject = JSON.parse(this.swaggerData)

   constructor() {
      this.app = express()
      this.v1_routes = new Routes()
      this.loadEnv()
      this.use()
      this.configuration()
   }

   private loadEnv() {
      this.env = { port: config.port }
   }

   private use() {
      this.app.use(cors())
      this.app.use(morgan('combined'))
      this.app.use(express.json())
      this.app.use(bodyParser.json({ limit: '150mb' }))
      this.app.use(
         bodyParser.urlencoded({
            limit: '150mb',
            extended: true,
         }),
      )
      this.app.use(
         '/api/v1/',
         requestQueryTransformer,
         apiMethods,
         this.v1_routes.router,
      )
      this.app.get('/ping', (_, res: Response) => {
         res.status(200).send('Oops ! Server is Creashed')
      })
      this.app.use(
         '/swagger',
         swaggerUi.serve,
         swaggerUi.setup(this.swaggerDocument),
      )
      this.app.use((_, __, next: NextFunction) => {
         next({
            message: 'Route Not Found',
            status: {
               code: 404,
               success: false,
            },
            error: {},
         })
      })
      this.app.use((error: any, _, res: Response, __) => {
         res.status(error?.status?.code || 400).json(error)
      })
   }

   private configuration() {
      this.app.set('port', this.env.port)
   }

   public run() {
      this.app.listen(this.app.get('port'), async () => {
         try {
            await redisClient.connect()
            console.log('redis connected')
            console.log(
               `.............. server is running at port ${this.app.get(
                  'port',
               )}  .........`,
            )
         } catch (error) {
            console.log(error)
         }
      })
   }
}
