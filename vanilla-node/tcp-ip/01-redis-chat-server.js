var net = require('net')
var redis = require('redis')
var clientId = 1

/**
 * 利用 redist 的 publisher/subscriber 来完成一个单间的对话。
 */

var server = net.createServer((socket) => {
	let subscriber
	let publisher
	let clientNum

	// 当有客户端连接上来时。
	clientNum = clientId ++
	socket.write('Client 00' + clientNum + ' is logined. \r\n')
  // 创建一个订阅者。
  subscriber = redis.createClient(6379, '127.0.0.1')
  subscriber.subscribe('main_chat_room')
  subscriber.on('message', (channel, message) => {
    socket.write('Channel ' + channel + ' , client 00' + clientNum + ' said : ' + message)
  })

  // 创建一个发布者
  publisher = redis.createClient(6379, '127.0.0.1')

	// 当收到客户端信息时。
	socket.on('data', (data) => {
	  publisher.publish('main_chat_room', data)
	})

	socket.on('end', () => {
	  subscriber.unsubscribe('main_chat_room')
	  // 断开与 redis 的链接。
	  subscriber.end()
	  publisher.end()
	})
})

server.listen(1337)