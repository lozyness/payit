"use strict";

var User = require("../user/user");

function getUser(request, response) {
    var id = request.uri.child();
    var userRequest = User.getUserById(id);
    userRequest.on('complete', function (user) {
        response.writeHead(200, {"ContentType": "application/json"});
        response.write(JSON.stringify(user));
        response.end();
    });
}

function getUsers(request, response) {
    var userRequest = User.getAll();
    userRequest.on('complete', function (users) {
        response.writeHead(200, {"ContentType": "application/json"});
        response.write(JSON.stringify(users));
        response.end();
    });
}

function createUser(request, response) {
    request.onJson(function (err, user) {
        var newUser = new User();
        newUser.name = user.name;
        newUser.username = user.username;
        var userRequest = newUser.save();
        userRequest.on('end', function () {
            response.writeHead(200, {"ContentType": "application/json"});
            response.write(JSON.stringify({status: "Ok"}));
            response.end();
        });
    });
}

function updateUser(request, response) {
    var id = request.uri.child();
    request.onJson(function (err, userData) {
        User.getUserById(id).on('complete', function (user) {
            user.name = userData.name;
            user.username = userData.username;
            user.save().on('end', function () {
                response.writeHead(200, {"ContentType": "application/json"});
                response.write(JSON.stringify({status: "Ok"}));
                response.end();
            });
        })
    })
}

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;