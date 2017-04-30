var http = require('http');
var server = http.createServer((req, res) => {
	req.setEncoding('utf8')
	req.on('data', (chunk) => {
		console.log('parsed', chunk)
	})
	req.on('end',()=> {
		console.log('end');
	})
	var body = 'Hello Node server'
	res.setHeader('Content-length', body.length)
	res.setHeader('Content-type', 'text/plain')
	res.write(body)
	res.end()
})
server.listen(3000, function () {
	console.log('Server started: http://localhost:3000')
})
