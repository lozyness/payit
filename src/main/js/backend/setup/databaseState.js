'use strict'
var database = require('../utils/database');
var userDBO = require('../user/userDBO');
var paymentTable = require('./paymentTable');

function reset() {
    var connection = database.obtainConnection('localhost', 'root')

    var dbname = 'payit';

    database.dropDatabase(connection, dbname);
    database.createDatabase(connection, dbname);
    userDBO.createTable(connection);
    paymentTable.createTable(connection);
    connection.end();
    return connection;
}

module.exports.reset = reset;