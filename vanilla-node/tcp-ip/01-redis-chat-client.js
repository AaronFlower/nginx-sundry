var net = require('net')

var client = new net.Socket()
client.connect(1337, 'localhost', () => {
  console.log('Connected to chatroom server')
  client.write('Hello everyone.')
})

client.on('data', (data) => {
  console.log('The server said: ' + data)
})
client.on('close', () => {
  console.log('Connection closed.')
})