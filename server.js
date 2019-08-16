const http = require ('http')
const app = require('./app')

const port = process.env.port || 4200

const server = http.createServer(app)

server.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`server started on ${process.env.port || 4200}`)
})