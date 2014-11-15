var fileUtil = require('./fileUtil');
var pkg = JSON.parse(fileUtil.readFile('./package.json'));

function showVersion() {
	console.log(pkg.version);
}

function showHelp() {
	var conent = [
		'命令列表',
		'=================================================================',
		'init       初始化: 生成默认配置目录(.autocode)和文件(config.json)',
		'',
		'参数列表',
		'=================================================================',
		'--help     查看帮助',
		'--version  查看版本',
		'--force    复制并强制覆盖原文件;',
		'           例如: autocode modA customModName --force'
	].join('\n');

	console.log(conent);
}

module.exports = {
	showVersion: showVersion,
	showHelp: showHelp
};