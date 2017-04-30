var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')

var server = http.createServer((req, res) => {
	var urlInfo = url.parse(req.url)
	var pathname = urlInfo.pathname
	var filePath = path.join(__dirname, pathname)
	console.log(filePath)
	var stream = fs.createReadStream(filePath)
	stream.on('data', (chunk) => {
		res.write(chunk)
	})
	stream.on('end', () => {
		res.end()
	})
	stream.on('error', function (error) {
		console.log(error)
		res.statusCode = 500
		res.end('Internal server error')
	})

})


server.listen(3000, function () {
	console.log('Server started: http://localhost:3000')
})
