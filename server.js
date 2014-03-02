var http = require("http").createServer(handler),
	url = require("url"),
	path = require("path"),
	fs = require("fs"),
	io = require("socket.io").listen(http);

http.listen(80);

var filePath;

function handler(request, response) {
 
	var uri = url.parse(request.url).pathname,
		filename = path.join(process.cwd(), uri);
	
	path.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
			return;
		}
 
		if (fs.statSync(filename).isDirectory()) filename += '/index.html';
 
		fs.readFile(filename, "binary", function(err, file) {
			if(err) {	
				response.writeHead(500, {"Content-Type": "text/plain"});
				response.write(err + "\n");
				response.end();
				return;
			}
 
			response.writeHead(200);
			response.write(file, "binary");
			response.end();
		});
	});
}

fs.watchFile('index.html', function(event, filename) {
  	if (event) {
  		io.sockets.emit('changed');
  	}
});

fs.watchFile('./css/bd.css', function(event, filename) {
	if (event) {
		io.sockets.emit('changed');
	}
});

fs.watchFile('./js/main.js', function(event, filename) {
	if (event) {
		io.sockets.emit('changed');
	}
});
