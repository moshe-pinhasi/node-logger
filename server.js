const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const http = require('http')
const Logger = require('./logger.js')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))

app.get('/', (req, res) => {
    Logger.info('GET requested')
    res.send({message: 'hello'})
})

const port = process.env.PORT || 3030
const server = http.createServer(app)
server.listen(port)
Logger.info('Server listening on: ' + port)
console.log('Server listening on: ', port)