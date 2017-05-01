var net = require('net')
var server = net.createServer(function (socket) {
	socket.write('Echo Hello Tcp Server \r\n')
	socket.pipe(socket)
})
server.listen(1337, '127.0.0.1')
/**
 * $ nc 127.0.0.1 1337 
 * 可以看到结果了, nc 即就是 netcat 命令。
 * > Echo Hello Tcp Server
 */
