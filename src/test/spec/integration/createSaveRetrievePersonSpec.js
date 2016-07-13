'use spec';
var async = require('async');
var backendLoc = '../../../main/js/backend';
var User = require(backendLoc + '/user/user');
var databaseState = require(backendLoc + '/setup/databaseState');

describe("User e2e creation:", function () {

    beforeEach(function (done) {
        databaseState.reset().on('end', function () {
            done();
        });
    });

    it("Can create and save user", function (done) {
        var username = "CammyShaw";
        var user = new User();
        var name = "Cameron";
        user.name = name;
        user.username = username;
        async.series([
                function (callback) {
                    user.save().on('end', function () {
                        callback(null);
                    });
                },
                function (callback) {
                    User.getUser(username).on('complete',
                        function (result) {
                            callback(null, result);
                        }
                    );
                }],
            function (err, results) {
                var user = results[1];
                expect(user).toBeDefined();
                expect(user.name).toBe(name);
                expect(user.username).toBe(username);
                databaseState.reset();
                done();
            }
        );
    })
});