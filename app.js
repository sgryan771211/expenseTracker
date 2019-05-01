const express = require('express')
const app = express();
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect('mongodb://localhost/expenseTracker', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: 'rsjdtkuyliuflif',
  resave: 'false',
  saveUninitialized: 'false',
}))

app.use(passport.initialize())
app.use(passport.session())
// 載入 Passport config
require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

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
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))
app.use('/filter', require('./routes/filter'))

app.listen(3000, () => {
  console.log('App is running!')
})