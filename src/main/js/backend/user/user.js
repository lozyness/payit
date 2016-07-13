'use strict';

var userDBO = require('./userDBO');
var EventEmitter = require('events').EventEmitter;

var User = function () {
};

User.prototype = {
    id: "",
    name: "",
    username: "",
    save: function () {
        var request;
        if (this.id != "") {
            request = userDBO.updateUser(this);
        } else {
            request = userDBO.addUser(this.name, this.username);
        }
        return request;
    }
};

User.getUser = function (username) {
    var events = new EventEmitter();

    userDBO.loadByUsername(username).on('result',
        function (result) {
            var user = new User();
            user.id = result.id;
            user.username = result.email;
            user.name = result.name;

            events.emit('complete', user);
        });
    return events;
};

User.getUserById = function (id) {
    var events = new EventEmitter();

    userDBO.loadById(id).on('result',
        function (result) {
            var user = new User();
            user.id = result.id;
            user.username = result.email;
            user.name = result.name;

            events.emit('complete', user);
        });
    return events;
};

User.getAll = function () {
    var events = new EventEmitter();
    var users = [];
    var userLoad = userDBO.loadAll();
    userLoad.on('result',
        function (result) {
            var user = new User();
            user.id = result.id;
            user.username = result.email;
            user.name = result.name;
            users.push(user);
        }
    );
    userLoad.on('end',
        function () {
            events.emit('complete', users);
        }
    );
    return events;
};

module.exports = User;