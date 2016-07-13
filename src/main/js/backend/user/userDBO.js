'use strict';

var database = require("../utils/database");

var connection;

function createTable(connection) {
    var sql = '' +
        'CREATE TABLE payit.user ' +
        '(' +
        'id int(11) NOT NULL AUTO_INCREMENT, ' +
        'email VARCHAR(100), ' +
        'name VARCHAR(50), ' +
        'PRIMARY KEY(id)' +
        ')';
    var createUserTable = connection.query(sql);
    createUserTable.on('error', function (err) {
        console.log("Could not create table 'user'.");
        console.log("SQL:");
        console.log(sql);
    });
}

function addUser(name, username) {
    var sql = '' +
        'INSERT INTO payit.user (email, name) ' +
        'VALUES ("' +
        username + '", "' +
        name +
        '")';
    var connection = getConnection();
    var addUser = connection.query(sql);
    addUser.on('error', function (err) {
        console.log("Could not add user '" + name + "'.");
        console.log("SQL:");
        console.log(sql);
    });
    return addUser;
}

function loadByUsername(username) {
    var sql = '' +
        'SELECT * from payit.user ' +
        'WHERE email="' + username + '"';
    var connection = getConnection();
    var getUser = connection.query(sql);
    getUser.on('error', function (err) {
        console.log(err);
        console.log("Could not get user '" + username + "'.");
        console.log("SQL:");
        console.log(sql);
    });
    return getUser;
}

function loadById(id) {
    var sql = '' +
        'SELECT * from payit.user ' +
        'WHERE id="' + id + '"';
    var connection = getConnection();
    var getUser = connection.query(sql);
    getUser.on('error', function (err) {
        console.log(err);
        console.log("Could not get user with ID: '" + id + "'.");
        console.log("SQL:");
        console.log(sql);
    });
    return getUser;
}


function updateUser(user) {
    var name = user.name;
    var email = user.username;
    var id = user.id;
    var sql = '' +
        'UPDATE payit.user ' +
        'SET name="' + name + '",' +
        'email="' + email + '" ' +
        'WHERE id=' + id;
    var connection = getConnection();
    var getUser = connection.query(sql);
    getUser.on('error', function (err) {
        console.log(err);
        console.log("Could not get user with ID: '" + id + "'.");
        console.log("SQL:");
        console.log(sql);
    });
    return getUser;
}

function loadAll() {
    var sql = 'SELECT * from payit.user';
    var connection = getConnection();
    var getUsers = connection.query(sql);
    getUsers.on('error', function (err) {
        console.log(err);
        console.log("Could not get user '" + username + "'.");
        console.log("SQL:");
        console.log(sql);
    });
    return getUsers;
}

function getConnection() {
    if (!connection) {
        connection = database.obtainConnection("localhost", 'root');
    }
    return connection;
}

module.exports.connection = connection;
module.exports.addUser = addUser;
module.exports.loadAll = loadAll;
module.exports.loadById = loadById;
module.exports.updateUser = updateUser;
module.exports.loadByUsername = loadByUsername;
module.exports.createTable = createTable;