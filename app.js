const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

mongoose.connect('mongodb://localhost/expenseTracker', { useNewUrlParser: true })

const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 Record model
const Record = require('./models/record');

// 載入路由器
app.use('/', require('./routes/home'))
app.use('/record', require('./routes/record'))

app.listen(3000, () => {
  console.log('App is running!')
})