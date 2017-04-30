var http = require('http')
var server = http.createServer((req, res) => {
	// Bascic Authorization 是通过 http header 中的 authorization 来获取的。
	console.log('authorization:', req.headers.authorization)
	let auth = req.headers.authorization
	if (!auth) {
		// not authorized.
		res.statusCode = 401
		res.setHeader('WWW-Authenticate', 'Basic realm="need login"');
		res.end('Authorization Required')
	} else {
		// decode authorization info
		// Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
		let tmp = auth.split(' ')
		let data = new Buffer(tmp[1], 'base64') // create a buffer and tell it the data coming in is base64
		let plain_auth = data.toString()
		console.log('Plain auth: ', plain_auth)
		let credits = plain_auth.split(':')
		let name = credits[0]
		let password = credits[1]
		if (name == 'eason' && password == '123') {
			res.end('OK')
		} else {
			res.end('Authorization Failed')
		}
	}
})


server.listen(3000, () => {
  console.log('Server started: http://localhost:3000')
})