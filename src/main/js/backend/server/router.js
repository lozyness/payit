var url = require('url');

function route(request, response, handlers) {
    var path = getPath(request);
    var handler = handlers[path];
    if (typeof handler === 'function') {
        handler(request, response);
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
        console.log("No request handler found for path: " + path);
    }
}

function getPath(request) {
    var path = url.parse(request.url).pathname;
    console.log(path);
    return path;
}

module.exports.route = route;
