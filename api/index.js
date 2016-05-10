/**
 * Created by sheldon on 2016/5/9.
 */
var server = require("./server");
var router = require("./router");

server.start(router.route);