var fileUtil = require('./fileUtil');

var defaultConfigPath = './.autocode/config.json';


function initConfig() {
	var defaultConfig = {
		author: 'liwei',
		email: 'liwei47@baidu.com',
		tplDir: './.autocode/tpl',
		destDir: {
			demoMod: '../biz12'
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
		console.error('文件: `' + defaultConfigPath + '` 不存在!');
	}
	var content = fileUtil.readFile(defaultConfigPath);
	return JSON.parse(content);
}


module.exports = {
	initConfig: initConfig,
	getConfig: getConfig,
	hasConfig: hasConfig
};