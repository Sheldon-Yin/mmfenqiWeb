/**
 * Created by sheldon on 2016/5/18.
 */
var mongoose = require('mongoose');
var AgentSchema = require('../schemas/agent');
var Agent = mongoose.model('Agent',AgentSchema);

module.exports = Agent;

