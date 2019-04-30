const express = require('express')
const router = express.Router()
const Record = require('../models/record')


// 列出全部 record
router.get('/', (req, res) => {
  res.send('列出所有 record')
})

// 新增一筆 record 頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 新增一筆  record
router.post('/', (req, res) => {
  const record = Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
  })

  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改 record 頁面
router.get('/:id/edit', (req, res) => {
  res.send('修改 record 頁面')
})

// 修改 record
router.post('/:id', (req, res) => {
  res.send('修改 record')
})

// 刪除 record
router.post('/:id/delete', (req, res) => {
  res.send('刪除 record')
})

module.exports = router