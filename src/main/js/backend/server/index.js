var Server = require('./server').Server;

var server = Server("8888");

server.listen(function () {
    console.log("Server started and is listening on port 8888");
});