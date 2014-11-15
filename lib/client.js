var cmd = require('./cmd');

module.exports = {
	execute: function(){
		var args = process.argv.slice(process.argv[0] === 'node' ? 2 : 0);
		cmd.parse(args);
	}
};