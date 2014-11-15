var cmd = require('./cmd');

module.exports = {
	execute: function(){
		var args = process.argv.slice(2);
		cmd.parse(args);
	}
};