const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({
    status: 'ok'
  })
})

router.get('/api', (req, res) => {
  res.json({
    status: 'response'
  })
})

module.exports = router
