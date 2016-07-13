'use strict';
var EventEmitter = require('events').EventEmitter;

var backendLoc = "../../main/js/backend";
var User = require(backendLoc + '/user/user');
var userDBO = require(backendLoc + '/user/userDBO');
var databaseState = require(backendLoc + '/setup/databaseState');

describe("User:", function () {

    it("generates empty user", function () {
        var user = new User();
        expect(user).toBeDefined();
        expect(user.id).toBe("");
        expect(user.name).toBe("");
        expect(user.username).toBe("");
    });

    it("can be saved", function (done) {
        var addUser = spyOn(userDBO, 'addUser').andCallFake(
            function (name, username) {
                var event = new EventEmitter();
                setTimeout(function () {
                    event.emit('end');
                }, 0);
                return event;
            }
        );
        var user = new User();
        user.name = "Name";
        user.username = "Username";
        user.save().on('end', function () {
            expect(addUser).toHaveBeenCalledWith("Name", "Username");
            done();
        });
    });

    it("can be loaded by username", function (done) {
        var loadUser = spyOn(userDBO, 'loadByUsername').andCallFake(
            function (username) {
                var event = new EventEmitter();
                setTimeout(function () {
                    event.emit('result', {id: 1, name: "Name", email: username});
                }, 0);

                return event;
            }
        );
        var username = "Username";
        User.getUser(username).on('complete', function (user) {
            expect(loadUser).toHaveBeenCalledWith("Username");
            expect(user).toBeDefined();
            expect(user.id).toBe(1);
            expect(user.name).toBe("Name");
            expect(user.username).toBe("Username");
            done();
        });
    });

    it("can be loaded by id", function (done) {
        var loadUser = spyOn(userDBO, 'loadById').andCallFake(
            function (id) {
                var event = new EventEmitter();
                setTimeout(function () {
                    event.emit('result', {id: id, name: "Name", email: "Username"});
                }, 0);

                return event;
            }
        );
        var id = 1;
        User.getUserById(id).on('complete', function (user) {
            expect(loadUser).toHaveBeenCalledWith(id);
            expect(user).toBeDefined();
            expect(user.id).toBe(id);
            expect(user.name).toBe("Name");
            expect(user.username).toBe("Username");
            done();
        });
    });

    it("can return all registered users", function (done) {
        var loadAll = spyOn(userDBO, 'loadAll').andCallFake(
            function () {
                var userOne = {
                    id: 1, name: "nameA", email: "usernameA"
                };
                var userTwo = {
                    id: 2, name: "nameA", email: "usernameA"
                };
                var userThree = {
                    id: 3, name: "nameA", email: "usernameA"
                };
                var events = new EventEmitter();
                setTimeout(function () {
                    events.emit('result', userOne);
                    events.emit('result', userTwo);
                    events.emit('result', userThree);
                    events.emit('end');
                }, 0);
                return events;
            });
        User.getAll().on('complete', function (userList) {
            expect(loadAll).toHaveBeenCalled();
            expect(userList).toBeDefined();
            expect(userList.length).toBe(3);
            expect(userList[0].id).toBe(1);
            expect(userList[0].name).toBe("nameA");
            expect(userList[0].username).toBe("usernameA");
            done();
        });
    });

    it("can be updated by id", function (done) {
        var loadUser = spyOn(userDBO, 'loadById').andCallFake(
            function (id) {
                var event = new EventEmitter();
                setTimeout(function () {
                    event.emit('result', {id: id, name: "Name", email: "Username"});
                }, 0);

                return event;
            }
        );
        var updateUser = spyOn(userDBO, 'updateUser').andCallFake(
            function (user) {
                var event = new EventEmitter();
                setTimeout(function () {
                    event.emit('end');
                }, 0);
                return event;
            }
        );
        var id = 1;
        User.getUserById(id).on('complete', function (user) {
            user.name = "NewName";
            user.save().on('end', function () {
                expect(loadUser).toHaveBeenCalledWith(1);
                expect(updateUser).toHaveBeenCalledWith(
                    jasmine.objectContaining({
                        id: id,
                        name: "NewName",
                        username: "Username"
                    })
                );
                expect(user).toBeDefined();
                expect(user.name).toBe("NewName");
                expect(user.username).toBe("Username");
                done();
            });
        });
    });

});