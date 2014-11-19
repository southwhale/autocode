/**
 * @file  : configUtil.js
 * @author: liwei
 * @email : relativeli@qq.com
 * @date  : 2014/11/15
 */
var fileUtil = require('./fileUtil');

var defaultConfigPath = './.autocode/config.json';


function initConfig() {
	var defaultConfig = {
		author: 'yourname',
		email: 'youremail',
		tplDir: './.autocode/tpl',
		destDir: {
			'modname': 'yourdestdir'
		}
	};

	fileUtil.writeFile(defaultConfigPath, JSON.stringify(defaultConfig, null, 4));
	fileUtil.createDir(defaultConfig.tplDir);
}

function hasConfig(){
	return fileUtil.has(defaultConfigPath);
}

function getConfig() {
	if (!fileUtil.has(defaultConfigPath)) {
		console.error('file: `' + defaultConfigPath + '` not exists!');
	}
	var content = fileUtil.readFile(defaultConfigPath);
	return JSON.parse(content);
}


module.exports = {
	initConfig: initConfig,
	getConfig: getConfig,
	hasConfig: hasConfig
};