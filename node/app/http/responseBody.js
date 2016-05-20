/**
 * Created by sheldon on 2016/5/18.
 */
var Response = function (data, message, code) {
	var res = {};
	res.code = code ? code : 200;
	if (res.code === 200) {
		res.message = message ? message : "成功";
	} else {
		res.message = message ? message : "";
	}
	res.data = data;
	return res;
};

module.exports = Response;
