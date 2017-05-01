var https = require('https'),
	fs =  require('fs');

var options = {
	key: fs.readFileSync('./ssh/key.pem'),
	cert: fs.readFileSync('./ssh/key-cert.pem') 
}

https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('Hello https world!')
}).listen(3000, () => {
  console.log('Server Started: http://localhost:3000')
})