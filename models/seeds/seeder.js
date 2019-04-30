const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/expenseTracker', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  Record.create({
    name: '看電影',
    category: '娛樂',
    date: '2019-04-01',
    amount: '100',
  })

})