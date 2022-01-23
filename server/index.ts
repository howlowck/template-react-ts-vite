import { config } from 'dotenv'
config()
import makeApp from './server'

const port = process.env.port ?? process.env.PORT ?? 8585
const app = makeApp({
  environment: (process.env.NODE_ENV as 'prod' | 'dev' | 'test') ?? 'prod',
  dataStorageType: (process.env.DATA_STORAGE_TYPE as 'aztable') ?? 'aztable',
  dataStorageConnectionString: process.env.DATA_STORAGE_CONNECTION_STRING,
})

app.listen(port, () => {
  console.log(`The application is running on port ${port}`)
})
