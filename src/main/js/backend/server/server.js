"use strict";

var Percolator = require('percolator').Percolator;
var requestHandler = require('./requestHandler');

var Server = function (port) {
    var server = Percolator({'port': port, 'autoLink': false});
    server.route('/api/users',
        {
            GET: requestHandler.getUsers,
            POST: requestHandler.createUser
        }
    );
    server.route('/api/users/:id',
        {
            GET: requestHandler.getUser,
            POST: requestHandler.updateUser
        }
    );
    return server;
};


module.exports.Server = Server;
