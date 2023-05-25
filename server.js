const express=require('express');
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

const auth=require('./routes/auth');

const dashboard = require('./routes/customers');


require('dotenv').config()
require('./dbConfig') // database connection

//-- Express configuration & Middleware
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, '/public'))) 

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(
  session({
    name: 'sessionId',
    secret: 'Kuy8fuSeYHDfR6dOCwNS6K6sy2QmhSEp',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 15,
      secure: false,
      httpOnly: true
    }
  })
)

app.use('/',auth);
app.use('/', dashboard);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`)
  console.log(`http://localhost:${process.env.SERVER_PORT}`)
})

