/**
 * Created by sheldon on 2016/5/18.
 */
var mongoose = require('mongoose');
var Agent = mongoose.model('Agent');
var Response = require('../http/responseBody');

exports.newAgent = function (req, res) {
	var _agent = {};
	_agent.name = req.body.name;
	_agent.telephone = req.body.telephone;
	var agent = new Agent(_agent);
	agent.save(function(err,agent) {
		if (err) {
			res.send(Response(null,err.errmsg,err.code));
		} else {
			res.send(Response(agent));
		}
	});
};

