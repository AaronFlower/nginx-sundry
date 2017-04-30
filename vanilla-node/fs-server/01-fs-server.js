var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')

var server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname
  var stream = fs.createReadStream(path.join(__dirname, pathname))
  /**
   * pipe 将流流动到 res 中。
   * res.end() 会在 stream.pipe(res) 内部调用。
   */
  stream.pipe(res)
  stream.on('error', (error) => {
    console.log(error)
    res.statusCode = 500
    res.end('Internal Server Error\n');
  })
})

server.listen('3001', () => {
  console.log('Server started: http://localhost:3001')
})