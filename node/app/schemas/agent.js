/**
 * Created by sheldon on 2016/5/18.
 */
var mongoose = require('mongoose');

var AgentSchema = new mongoose.Schema({
	name: String,
	telephone: {
		type: String,
		unique: true
	},
	imgUrl: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

AgentSchema.pre('save', function(next) {
	var agent = this;

	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

module.exports = AgentSchema;
