const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express('/');
console.log(__dirname)
app.use(express.static(__dirname + '/static'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

var connections = []

wss.on('connection', function connection(ws, req) {
	const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  connections.push(ws)

  ws.on('message', function incoming(message) {
  	console.log('received: %s', message);
  	brodcast(message)
  });

  ws.on('close', function(){
  	connections = connections.filter(function (connect, i, array){
  		//todo 確認
  		return (connect === ws) ? false : true
  	})
  })

  ws.send('something');
});


function brodcast(message){
	connections.forEach(function (con, i){
		con.send(message)
	})
}




server.listen(process.env.PORT || 8080 , function listening() {
	console.log('Listening on %d', process.env.PORT || 8080);
});
