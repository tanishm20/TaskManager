const express = require('express')

const { db } = require('./db')
const { dbnotes} = require('./dbnotes')
const todoRoute = require('./routes/todos')
const PORT = process.env.PORT ||6534
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/todos', todoRoute)

db.sync(),dbnotes.sync()
  .then(() => {
    app.listen(PORT)
  })
  .catch((err) => {
    console.error(err)
  })
