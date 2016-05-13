var express = require('express');
//var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var user = require('./database/db').user;

var app = express();

//app.use(logger('dev'));
//app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//app.use(cookieParser());
app.use(express.static('public'));

//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello GET');
});

app.post('/api/login',urlencodedParser, function (req, res) {
    console.log(req.body);
    console.log(req.query);
    var query_doc = {name: req.body.name, password: req.body.password};
    console.log(query_doc);
    (function () {
        user.count(query_doc, function (err, doc) {
            console.log(query_doc.name);
            console.log(doc);
            if (doc == 1) {
                console.log(query_doc.name + ": login success in " + new Date());
                var backJson = {};
                backJson.result = 0;
                backJson.message = '登录成功';
                backJson.data = {};
                backJson.data.userName = query_doc.name;
                backJson.data.password = query_doc.password;
                res.json(backJson);
            } else {
                console.log(query_doc.name + ": login failed in " + new Date());
                var backJson = {};
                backJson.result = 1;
                backJson.message = '登录失败';
                backJson.data = '密码错误';
                backJson.result = 1;
                res.json(backJson);
                //res.redirect('/');
            }
        });
    })(query_doc);
});


var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});

/*module.exports = app;*/
