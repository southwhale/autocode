var fileUtil = require('./fileUtil');
var pkg = JSON.parse(fileUtil.readFile('./package.json'));

function showVersion() {
	console.log(pkg.version);
}

function showHelp() {
	var conent = [
		'COMMAND LIST',
		'=================================================================',
		'init       initialize: create default configuration directory(.autocode) and file(config.json)',
		'',
		'ARGUMENT LIST',
		'=================================================================',
		'--help     look for help',
		'--version  look for version',
		'--force    copy and force overridding;',
		'           for example: autocode modA customModName --force'
	].join('\n');

	console.log(conent);
}

module.exports = {
	showVersion: showVersion,
	showHelp: showHelp
};