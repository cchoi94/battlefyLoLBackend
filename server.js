const http = require ('http')
const app = require('./app')

const port = process.env.PORT || 4200

const server = http.createServer(app)

server.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`server started on ${port}`)
})