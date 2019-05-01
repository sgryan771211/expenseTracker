const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

// 列出全部 record
router.get('/', authenticated, (req, res) => {
  res.send('列出所有 record')
})

// 新增一筆 record 頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

// 新增一筆  record
router.post('/', authenticated, (req, res) => {
  let errors = []
  if (!req.body.name || !req.body.category || !req.body.date || !req.body.amount) {
    errors.push({ message: '新增失敗，所有欄位都是必填' })
  }
  if (errors.length > 0) {
    Record.find({ userId: req.user._id }, (err, records) => {
      if (err) return console.error(err)
      let totalAmount = 0
      for (record of records) {
        totalAmount += record.amount
      }
      return res.render('index', { errors, records: records, totalAmount: totalAmount })
    })
  } else {
    const record = Record({
      name: req.body.name,
      category: req.body.category,
      date: req.body.date,
      amount: req.body.amount,
      userId: req.user._id,
    })

    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  }
})

// 修改 record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: record })
  })
})

// 修改 record
router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.category = req.body.category
    record.date = req.body.date
    record.amount = req.body.amount

    record.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/`)
    })
  })
})

// 刪除 record
router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router