/**
 * @file  : cmd.js
 * @author: liwei
 * @email : relativeli@qq.com
 * @date  : 2014/11/15
 */
var fileUtil = require('./fileUtil');
var stringUtil = require('./stringUtil');
var configUtil = require('./configUtil');
var tip = require('./tip');

var cmdMap = {
	'--version': tip.showVersion,
	'-version': tip.showVersion,
	'-v': tip.showVersion,
	'-help': tip.showHelp,
	'--help': tip.showHelp,
	'init': configUtil.initConfig
};

// 模块和模块下文件的路径连接符
var joinChar = '~';

//配置的默认目标文件夹路径引用符
var defaultDestDirRefChar = '!';

var nameRE = /^[$a-zA-z_][$a-zA-z_0-9]+/;

var cmdName = 'autocode';

function parse(sections) {
	sections = sections.slice(2);

	var arg1 = sections.shift();

	if(arg1 == null){
		tip.showHelp();
		return;
	}

	var f = cmdMap[arg1];
	if (f) {
		f();
		return;
	}

	var config = configUtil.getConfig();

	var mod = parseMod(arg1);

	var dest;
	var arg2 = sections.shift();

	dest = arg2 == null ? {
		destDir: getDestDir(config, mod.modName)
	} : parseDest(arg2, mod.modName);


	var arg3 = sections.shift();
	var newModName = dest.newModName,
		force = dest.force;

	if (arg3) {
		if (arg3 === '--force' || arg3 === '-force') {
			force = true;
		} else if (!newModName && nameRE.test(arg3)) {
			newModName = arg3;
		}
	}

	if (!force) {
		var arg4 = sections.shift();
		if (arg4 && (arg4 === '--force' || arg4 === '-force')) {
			force = true;
		}
	}

	var date = new Date();

	config.__date__ = date.getFullYear() + '/' + formatNum(date.getMonth() + 1) + '/' + formatNum(date.getDate()) + ' ' + formatNum(date.getHours()) + ':' + formatNum(date.getMinutes());
	config.__moduleprefix__ = newModName;

	if (mod.filePath && dest.filePath) {
		fileUtil.copyFile(mod.filePath, dest.filePath, config, null, force);
	} else if (mod.filePath) {
		var destFilePath = newModName ? dest.destDir + '/' + stringUtil.xapitalize(newModName) + '/' + mod.fileName : dest.destDir + '/' + mod.fileName;
		fileUtil.copyFile(mod.filePath, destFilePath, config, null, force);
	} else if (dest.filePath) {
		console.error('dest dir `' + dest.filePath + '` is not a dir, you could not copy dir into a file!');
	} else {
		fileUtil.copyDir(mod.modTplDir, newModName ? dest.destDir + '/' + stringUtil.xapitalize(newModName) : dest.destDir, config, null, force);
	}
}

function formatNum(num) {
	return num < 10 ? '0' + num : num;
}

function parseDest(arg, modName) {
	var sections, defaultDestDirRef, newModName, lastSlashIndex, filePath, force;
	var config = configUtil.getConfig();
	var destDir = getDestDir(config, modName);

	if (arg.indexOf('/') !== -1) {
		//绝对路径, 目标目录
		destDir = arg;
	} else if (arg.indexOf(joinChar) !== -1) {
		//相对模块默认目标目录的路径
		sections = arg.split(joinChar);
		defaultDestDirRef = sections.shift();
		if (defaultDestDirRef !== defaultDestDirRefChar) {
			console.error('the relative path of dest file(or dir) must begin with `' + defaultDestDirRefChar + '` !');
			return;
		}
		sections.unshift(destDir);
		destDir = sections.join('/');
	} else if (nameRE.test(arg)) {
		//需要生成的实际模块名
		newModName = arg;
	} else if (arg === '--force' || arg === '-force') {
		force = true;
	}

	lastSlashIndex = destDir.lastIndexOf('/');
	if (destDir.lastIndexOf('.') > lastSlashIndex) {
		// modDir 实际是一个文件
		filePath = destDir;
		destDir = destDir.substring(0, lastSlashIndex);
	}

	return {
		destDir: destDir,
		filePath: filePath,
		newModName: newModName,
		force: force
	};
}



function parseMod(arg) {
	var sections, modName, filePath, fileName, lastSlashIndex;
	var config = configUtil.getConfig();

	if (arg.indexOf('/') !== -1) {
		//绝对路径
		modDir = arg;
	} else if (arg.indexOf(joinChar) !== -1) {
		//相对模块路径
		sections = arg.split(joinChar);
		modName = sections.shift();
		modDir = config.tplDir ? config.tplDir + '/' + modName : modName;
		sections.unshift(modDir);
		modDir = sections.join('/');
	} else {
		//模块名
		modName = arg;
		modDir = config.tplDir ? config.tplDir + '/' + modName : modName;
	}

	lastSlashIndex = modDir.lastIndexOf('/');
	if (modDir.lastIndexOf('.') > lastSlashIndex) {
		// modDir 实际是一个文件
		filePath = modDir;
		fileName = filePath.substring(lastSlashIndex + 1);
		modDir = modDir.substring(0, lastSlashIndex);
	}

	return {
		modTplDir: modDir,
		modName: modName,
		filePath: filePath,
		fileName: fileName
	};
}

function getDestDir(config, modName) {
	return config.destDir && config.destDir[modName] || '';
}

module.exports = {
	parse: parse
};