/**
 * @file  : main.js
 * @author: liwei
 * @email : relativeli@qq.com
 * @date  : 2014/11/15
 */
var cmd = require('./lib/cmd');

exports.parse = function(args){
	cmd.parse(args);
};


if (module === require.main) {
    exports.parse(process.argv);
}
