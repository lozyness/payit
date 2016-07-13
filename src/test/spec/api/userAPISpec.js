'use strict';
var request = require('request');
var async = require('async');

var backendLoc = "../../../main/js/backend";
var User = require(backendLoc + '/user/user');
var databaseState = require(backendLoc + '/setup/databaseState');
var Server = require(backendLoc + '/server/server').Server;

describe("The API:", function () {

    var server;

    beforeEach(function (done) {
        server = Server("8081");
        server.listen(function (err) {
            databaseState.reset().on('end', function () {
                done();
            });
        });
    });

    afterEach(function (done) {
        server.close(function () {
            databaseState.reset().on('end', function () {
                done();
            });
        });
    });

    it("should respond to a GET request at /api/users", function (done) {
        async.series(
            [
                function (callback) {
                    var laura = new User();
                    laura.username = "Lozyness";
                    laura.name = "Laura";
                    laura.save().on('end', function (err) {
                        callback(err, laura);
                    });
                },
                function (callback) {
                    var cameron = new User();
                    cameron.username = "CammyShaw";
                    cameron.name = "Cameron";
                    cameron.save().on('end', function (err) {
                        callback(err, cameron);
                    });
                }
            ],
            function (err, results) {
                request.get(
                    {
                        'url': 'http://localhost:8081/api/users',
                        'json': true
                    },
                    function (err, res, body) {
                        expect(err).toBeNull();
                        expect(res).toBeDefined();
                        expect(res.statusCode).toBe(200);
                        expect(body[0]).toEqual(
                            jasmine.objectContaining({
                                id: 1,
                                name: "Laura",
                                username: "Lozyness"
                            })
                        );
                        expect(body[1]).toEqual(
                            jasmine.objectContaining({
                                id: 2,
                                name: "Cameron",
                                username: "CammyShaw"
                            })
                        );
                        done();
                    }
                );
            }
        );
    });

    it("should create a new user when receiving a POST request at /api/users", function (done) {
        var body = {
            "username": "CammyShaw",
            "name": "Cameron"
        };
        async.series(
            [
                function (callback) {
                    var laura = new User();
                    laura.username = "Lozyness";
                    laura.name = "Laura";
                    laura.save().on('end', function (err) {
                        callback(err, laura);
                    });
                }
            ],
            function (err, results) {
                request.post(
                    {
                        'url': 'http://localhost:8081/api/users',
                        'body': body,
                        'json': true
                    },
                    function (err, res, body) {
                        request.get(
                            {
                                'url': 'http://localhost:8081/api/users',
                                'json': true
                            }, function (err, res, body) {

                                expect(err).toBeNull();
                                expect(res).toBeDefined();
                                expect(res.statusCode).toBe(200);
                                expect(body[0]).toEqual(
                                    jasmine.objectContaining({
                                        id: 1,
                                        name: "Laura",
                                        username: "Lozyness"
                                    })
                                );
                                expect(body[1]).toEqual(
                                    jasmine.objectContaining({
                                        id: 2,
                                        name: "Cameron",
                                        username: "CammyShaw"
                                    })
                                );
                                done();
                            }
                        );
                    }
                );
            }
        );
    });

    it("should update a user when receiving a POST request at /api/users/:id", function (done) {
        var body = {
            "id": 2,
            "username": "CammyShaw",
            "name": "Cam"
        };
        async.series(
            [
                function (callback) {
                    var laura = new User();
                    laura.username = "Lozyness";
                    laura.name = "Laura";
                    laura.save().on('end', function (err) {
                        callback(err, laura);
                    });
                },
                function (callback) {
                    var cameron = new User();
                    cameron.username = "CammyShaw";
                    cameron.name = "Cameron";
                    cameron.save().on('end', function (err) {
                        callback(err, cameron);
                    });
                }
            ],
            function (err, results) {
                request.post(
                    {
                        'url': 'http://localhost:8081/api/users/2',
                        'body': body,
                        'json': true
                    },
                    function (err, res, body) {
                        request.get(
                            {
                                'url': 'http://localhost:8081/api/users',
                                'json': true
                            }, function (err, res, body) {
                                expect(err).toBeNull();
                                expect(res).toBeDefined();
                                expect(res.statusCode).toBe(200);
                                expect(body[0]).toEqual(
                                    jasmine.objectContaining({
                                        id: 1,
                                        name: "Laura",
                                        username: "Lozyness"
                                    })
                                );
                                expect(body[1]).toEqual(
                                    jasmine.objectContaining({
                                        id: 2,
                                        name: "Cam",
                                        username: "CammyShaw"
                                    })
                                );
                                done();
                            }
                        );
                    }
                );
            }
        );
    });

    it("should return the correct user when receiving a GET request at /api/users/:id", function (done) {
        async.series(
            [
                function (callback) {
                    var laura = new User();
                    laura.username = "Lozyness";
                    laura.name = "Laura";
                    laura.save().on('end', function (err) {
                        callback(err, laura);
                    });
                },
                function (callback) {
                    var cameron = new User();
                    cameron.username = "CammyShaw";
                    cameron.name = "Cameron";
                    cameron.save().on('end', function (err) {
                        callback(err, cameron);
                    });
                }
            ],
            function (err, results) {
                request.get(
                    {
                        'url': 'http://localhost:8081/api/users/2',
                        'json': true
                    },
                    function (err, res, body) {
                        expect(err).toBeNull();
                        expect(res).toBeDefined();
                        expect(res.statusCode).toBe(200);
                        expect(body).toEqual(
                            jasmine.objectContaining({
                                id: 2,
                                name: "Cameron",
                                username: "CammyShaw"
                            })
                        );
                        done();
                    }
                );
            }
        );
    });


});