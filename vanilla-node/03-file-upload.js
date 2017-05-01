var http = require('http')
var formidable = require('formidable')


var show = function (res) {
	let html = '<!DOCTYPE html>'
						+ '<html lang="en">'
						+ '<head>'
						+ '	<meta charset="UTF-8">'
						+ '	<title>File Upload Demo</title>'
						+ '	<style>'
						+ '		body {'
						+ '			width: 50%;'
						+ '			margin: auto;'
						+ '			margin-top: 50px;'
						+ '		}'
						+ '		input {'
						+ '			display: block;'
						+ '		}'
						+ '	</style>'
						+ '</head>'
						+ '<body>'
						+ '	<form action="/" method="POST" enctype="multipart/form-data">'
						+ '		<input type="text" name="name">'
						+ '		<input type="file" name="file">'
						+ '		<input type="submit" value="Submit">'
						+ '	</form>'
						+ '</body>'
						+ '</html>'
	res.setHeader('Content-Type', 'text/html; charset="utf-8"')
	res.setHeader('Content-Length', Buffer.byteLength(html))
	res.end(html)
}

var badRequest = function (res) {
	res.statusCode = 400
	res.end('Bad request')
}


var isFormData = function (req) {
	console.log(req.headers)
	let type = req.headers['content-type'] || ''
	return 0 === type.indexOf('multipart/form-data')
}

var upload = function (req, res) {
	if (!isFormData(req)) {
		badRequest(res)
		return 
	}	else {
		var form = new formidable.IncomingForm()
		form.on('progress', (bytesReceived, bytesExpected) => {
			let percent = Math.floor(bytesReceived / bytesExpected * 100)
			console.log(percent, '...')
		})
		form.parse(req, (err, fields, files) => {
			if (err) {
				console.log(err)
				res.statusCode = 500
				res.end('Internal Server Error')
			} else {
				// 文件已经上传成功了，我们可以把 files 拷贝到指定的目录即可。
			  console.log(files)
			  console.log(fields)
			  res.end('Upload completed!')
			}
		})
	}
}



var server = http.createServer((req, res) => {
  switch(req.method) {
  	case 'POST':
 			upload(req, res) 
 			break;
 		case 'GET':
 			show(res)
 			break;
 		default:
 			badRequest()
  }
})

server.listen(3000, () => {
  console.log('Server started: http://localhost:3000')
})