var http = require('http')
var url = require('url')
var qs = require('querystring')
var items = []


var notFound = function (res) {
	res.statusCode = 404
	res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
	res.end('Not Found')
}

var badRequest = function (res) {
	res.statusCode = 404
	res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
	res.end('Bad Request')
}

var show = function (res) {
	console.log(items.map(item => {
				return `<li>${item}</li>`
			}).join(''))
	var body = '<!DOCTYPE html>'
	+ '<html lang="en">'
	+ '<head>'
	+ '	<meta charset="UTF-8">'
	+ '	<title>Node Form Test</title>'
	+ '	<style>'
	+ '		body {'
	+ '			width: 50%;'
	+ '			margin: auto;'
	+ '		}'
	+ '	</style>'
	+ '</head>'
	+ '<body>'
	+ '<h2> Task Itemss </h2>'
	+ '	<ul>'
			/**
			 * 这和 phtml jxp 解析不一样吗？
			 */
	+		items.map(item => {
				return `<li>${item}</li>`
			}).join('')
	+ '	</ul>'
	+ '<form action="/" method="POST">'
	+ '	<input type="text" name="item">'
	+ '	<button>Add</button>'
	+ '</form>'
	+ '</body>'
	+ '</html>';
	res.setHeader('Content-Length', Buffer.byteLength(body))
	// 这时一定要指定为 text/html
	res.setHeader('Content-Type', 'text/html; charset="utf-8"')
	res.end(body)
}
/**
 * 处理 post 添加 item.
 */
var add = function (req, res) {
	var body = ''
	req.setEncoding('utf8')
	req.on('data', (chunk) => {
	  body += chunk
	})
	req.on('end', () => {
		console.log('add:', req.body)
	  var postData = qs.parse(body)
	  console.log(postData)
	  items.push(postData.item)
	  show(res)
	})
}

var server = http.createServer((req, res) => {
	if (req.url == '/') {
		switch (req.method) {
			case 'POST':
				add(req, res);
				break;
			case 'GET':
				show(res)
				break;
			default: 
				badRequest(res)
		}
	} else {
		notFound(res)
	}
})

server.listen(3003, () => {
  console.log('Server started: http://localhost:3003')
})