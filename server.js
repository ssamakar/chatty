messages = [
	{body: 'hi there'},
	{body: 'oh hello'}
];

http = require('http');
port = 8000;

onRequest = function(req, res){
	if (req.method == "OPTIONS"){
		res.writeHead(200, {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		'Connection': 'Close',
		'Content-Type': 'application/json'
		});
		res.end("{}");
	}
	else if (req.method == "GET"){
		res.writeHead(200, {
		'Connection': 'Close',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
		});
		res.end(JSON.stringify(messages));
	}
	else if (req.method == "POST"){
		var postData = '';
		req.on('data', function(chunk){
			postData += chunk.toString();
		});
		req.on('end', function(){
			console.log("Got POST Data:");
			console.log(postData);
			messages.push(JSON.parse(postData));
		});
		res.writeHead(200, {
			'Connection': 'close',
			'Access-Control-Allow-Origin': '*'
		});
		res.end(JSON.stringify(messages));
	}
}
http.createServer(onRequest).listen(port);
console.log("server's up on port " + port);



// an express version that doesn't work
// var express = require('express'),
// 	app = express();
// 	bodyParser = require('body-parser');

// console.log("server has started.")

// app.use(function(req, res, next){
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	next();
// });

// app.use(bodyParser());

// app.all('*', function(req, res, next){
// 	console.log("app.all");
// 	res.header('Access-Control-Allow-Origin', '127.0.0.1');
// 	res.header('Access-Control-Allow-Headers');
// 	next();
// });

// app.get('/', function(req, res){	
// 	res.json(200, messages);
// });

// app.post('/', function(req, res){
// 	var message = req.body;
// 	messages.push(message);
// 	res.json(201, messages);
// });

// app.listen(4000, function(){
// 	console.log("hi i am listening on 4000")
// })