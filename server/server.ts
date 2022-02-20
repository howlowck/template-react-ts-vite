import express from 'express'
import bp from 'body-parser'
import path from 'path'
import healthCheckRouter from './api/routes/healthcheck'

export type AppConfig = {
  environment: 'dev' | 'prod' | 'test'
  dataStorageType: 'aztable' | 'inMemory'
  dataStorageConnectionString?: string
}

export default (appConfig: AppConfig) => {
  const { dataStorageType } = appConfig
  const app = express()

  // Needed for parsing http body content.
  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))

  // Put the api routes here.
  app.use('/api/healthz', healthCheckRouter())

  // Static files
  app.use('/', express.static(path.join(__dirname, './static')))

  // // Error Handling
  // app.use(function (err, req, res) {
  //   console.error(`Unexpected error ${err.message} for request ${req}`)
  // } as express.ErrorRequestHandler)

  return app
}
