const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'pug')
app.use(express.static(__dirname + "/public"));

const indexRouter = require('./routes/index')

app.use('/', indexRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})