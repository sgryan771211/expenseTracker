const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/month/:month', authenticated, (req, res) => {
  Record.find({ userId: req.user._id }, (err, records) => {
    if (err) return console.error(err)
    const recordChoose = records.filter(record => {
      return req.params.month === record.date.substring(5, 7)
    })

    let totalAmount = 0
    for (record of recordChoose) {
      totalAmount += record.amount
    }

    res.render('index', { records: recordChoose, totalAmount: totalAmount })
  })
})

router.get('/category/:category', authenticated, (req, res) => {
  Record.find({ category: req.params.category, userId: req.user._id }, (err, records) => {
    if (err) return console.error(err)

    let totalAmount = 0
    for (record of records) {
      totalAmount += record.amount
    }

    res.render('index', { records: records, totalAmount: totalAmount })
  })
})

module.exports = router