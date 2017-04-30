var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')

var server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname
  var filePath = path.join(__dirname, pathname)
  fs.stat(filePath, (err, stat) => {
    if (err) {
    	if ('ENONET' == err.code) {
    		res.statusCode = 404
    		res.end('Not Found')
    	} else {
    		res.statusCode = 500
    		res.end('Internal Server Error!')
    	}
    } else {
    	res.setHeader('Content-Length', stat.size)
    	var stream = fs.createReadStream(filePath)
    	stream.pipe(res)
    	stream.on('error', (err) => {
    	  console.log(err)
    	  res.statusCode = 500
    	  res.end('Internal Server Error!')
    	})
    }
  })
})

server.listen(3002, () => {
  console.log('Server started: http://localhost:3002')
})