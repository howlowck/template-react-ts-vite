import express from 'express'

export default () => {
  const router = express.Router()
  router.get('/', async (_req, res) => {
    res.json({
      message: 'ok',
    })
  })
  return router
}
