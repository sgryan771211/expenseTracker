const mongoose = require('mongoose')
const Record = require('../record')
const bcrypt = require('bcryptjs')
const User = require('../user')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/expenseTracker', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  const testUser = User({
    name: 'testuser',
    email: 'testuser@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  })

  testUser.save(err => {
    if (err) return console.error(err)
  })

  Record.insertMany([
    {
      name: '午餐',
      category: 'utensils',
      date: '2019-04-01',
      amount: '100',
      userId: testUser._id,
    },
    {
      name: '晚餐',
      category: 'utensils',
      date: '2019-04-01',
      amount: '100',
      userId: testUser._id,
    },
    {
      name: '捷運',
      category: 'shuttle-van',
      date: '2019-04-01',
      amount: '100',
      userId: testUser._id,
    },
    {
      name: '電影',
      category: 'grin-beam',
      date: '2019-04-01',
      amount: '100',
      userId: testUser._id,
    },
    {
      name: '租金',
      category: 'home',
      date: '2019-04-01',
      amount: '100',
      userId: testUser._id,
    },
  ])

})