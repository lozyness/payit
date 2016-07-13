'use strict';

function createTable(connection) {
    var sql = '' +
        'CREATE TABLE payit.payment ' +
        '(' +
        'id int(11) NOT NULL AUTO_INCREMENT, ' +
        'name varchar(255), ' +
        'user_from int(11), ' +
        'user_to int(11), ' +
        'amount decimal(6, 2), ' +
        'PRIMARY KEY(id),' +
        'FOREIGN KEY (user_from) REFERENCES payit.user(id),' +
        'FOREIGN KEY (user_to) REFERENCES payit.user(id)' +
        ')';
    var createPaymentTable = connection.query(sql);
    createPaymentTable.on('error', function (err) {
        console.log("Could not create table 'payment'.");
        console.log("SQL:");
        console.log(sql);
    });
}

function addPayment(connection, name, from, to, amount) {
    var sql = '' +
        'INSERT INTO payit.payment (name, user_from, user_to, amount) ' +
        'VALUES ("' +
        name + '", ' +
        from + ', ' +
        to + ', ' +
        amount +
        ')';
    var addPayment = connection.query(sql);
    addPayment.on('error', function (err) {
        console.log("Could not add payment '" + name + "'.");
        console.log("SQL:");
        console.log(sql);
    });
}
module.exports.createTable = createTable;
module.exports.addPayment = addPayment;