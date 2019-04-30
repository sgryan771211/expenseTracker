const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// record 首頁
router.get('/', (req, res) => {
  res.send('hello')
})

module.exports = router