'use strict';

var mysql = require('mysql');
var DBWrapper = require('node-dbi').DBWrapper;

function obtainConnection(host, username) {
    return mysql.createConnection({
        host: host,
        user: username
    });
    // return new DBWrapper('mysql', {
    //     'host': host,
    //     'user': username,
    //     'database': 'payit'
    // });
}

function dropDatabase(connection, name) {
    var dropQuery = connection.query('DROP DATABASE ' + name);
    dropQuery.on('error', function (err) {
        console.log("Could not drop database '" + name + "'.");
    });
}

function createDatabase(connection, name) {
    var createQuery = connection.query('CREATE DATABASE ' + name);
    createQuery.on('error', function (err) {
        console.log("Could not create database '" + name + "'.");
    });
}

module.exports.obtainConnection = obtainConnection;
module.exports.createDatabase = createDatabase;
module.exports.dropDatabase = dropDatabase;