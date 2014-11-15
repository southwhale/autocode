var cmd = require('./lib/cmd');

exports.parse = function(args){
	cmd.parse(args);
};


if (module === require.main) {
    exports.parse(process.argv);
}
