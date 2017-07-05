'use strict'

const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Express app started on port ${port}`) // eslint-disable-line
})
