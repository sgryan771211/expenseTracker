const express = require('express')
const router = express.Router()
const Record = require('../models/record')


// 列出全部 record
router.get('/', (req, res) => {
  res.send('列出所有 record')
})

// 新增一筆 record 頁面
router.get('/new', (req, res) => {
  res.send('新增 record 頁面')
})

// 顯示一筆 record 的詳細內容
router.get('/:id', (req, res) => {
  res.send('顯示 record 的詳細內容')
})

// 新增一筆  record
router.post('/', (req, res) => {
  res.send('建立 record')
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