var cmd = require('../lib/cmd');

module.exports = {
	execute: function(){
		cmd.parse(process.argv);
	}
};