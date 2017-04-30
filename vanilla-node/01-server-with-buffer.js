var http = require('http')
var url = require('url')
var items = []

var server = http.createServer((req, res) => {
	console.log(" A new request");
	switch (req.method) {
		case 'POST':
			var item = ''
			req.setEncoding('utf8')
			req.on('data', (chunk) => {
				console.log(chunk)
				item += chunk
			})
			req.on('end', () => {
				items.push(item)
				res.end()
			})	
			break;
		case 'GET':
			/**
			 * 设定 Content-Length 头可以提高响应速度。
			 */
			var body = items.map((item, i) => {
				return i + ") " + item 
			}).join('\n')
			res.setHeader('Content-Length', Buffer.byteLength(body))
			res.setHeader('Content-Type', "text/plain; charset='utf-8'")
			res.write(body)
			res.end()
			break;
		case 'DELETE':
			var urlInfo = url.parse(req.url);
			var deleteIndex = parseInt(urlInfo.pathname.slice(1), 10)
			if (isNaN(deleteIndex)) {
				res.statusCode = 400
				res.end('Invalid item id')
			} else if (!items[deleteIndex]) {
				res.statusCode = 404
				res.end('Item not found')
			} else {
				items.splice(deleteIndex, 1)
				res.end('Ok \n')
			}
			break;

	}
})

server.listen(3000, () => {
 console.log('Server started: http://localhost:3000')
})
