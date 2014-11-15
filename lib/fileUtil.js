/**
 * @file  : config.js
 * @author: liwei
 * @email : iamweilee@gmail.com
 * @date  : 2014/11/15
 */

var fs = require('fs');
var pathParser = require('path');
var stringUtil = require('./stringUtil');

/**
 * 判断是否为文件
 */
function isFile(path) {
	return fs.statSync(path).isFile();
}

/**
 * 判断是否为目录
 */
function isDir(path) {
	return fs.statSync(path).isDirectory();
}

/**
 * 写文件
 */
function writeFile(filepath, content, force) {
	var pathSections = filepath.split('/');
	var lastSectionIndex = pathSections.length - 1;
	var path = '';
	pathSections.forEach(function(section, index) {
		if (index < lastSectionIndex) {
			path += section + '/';
			if (!has(path)) {
				createDir(path);
			}
		} else {
			path += section;
			if (has(path) && !force) {
				console.warn('文件: `' + path + '` 已存在, 该文件被忽略, 没有被覆盖, 您也可以使用 force 参数强制覆盖!');
				return;
			}
			fs.writeFileSync(path, content);
			console.log('写入文件 `' + pathParser.resolve(path) + '` 成功!');
		}
	});
}

/**
 * 读文件
 */
function readFile(filepath) {
	return fs.readFileSync(filepath, 'utf8');
}

/**
 * 在文件末尾添加数据
 */
function appendFile(filepath, content) {
	return fs.appendFileSync(filepath, content);
}

/**
 * 删除文件
 */
function delFile(filepath) {
	return fs.unlinkSync(filepath);
}

/**
 * 删除目录及各级子目录和它们的文件
 */
function delDir(dirpath) {
	var fileNames = getFileNames(dirpath);
	fileNames.forEach(function(fileName) {
		var path = dirpath + '/' + fileName;
		if (isDir(path)) {
			delDir(path);
		} else {
			delFile(path);
		}
	});

	return fs.rmdirSync(dirpath);
}

/**
 * 创建目录
 */
function createDir(dirpath) {
	var pathSections = dirpath.split('/');
	var path = '';
	pathSections.forEach(function(section) {
		path += section + '/';
		if (!has(path)) {
			fs.mkdirSync(path);
		}
	});
}

/**
 * 获取目录下所有文件名
 */
function getFileNames(dirpath) {
	return fs.readdirSync(dirpath);
}

/**
 * 检测文件或目录是否存在
 */
function has(path) {
	return fs.existsSync(path);
}

/**
 * 复制文件,替换源文件中的占位符
 */
function copyFile(srcfilepath, destfilepath, data, prefix, force) {
	if (!has(srcfilepath)) {
		console.error('文件: `' + srcfilepath + '` 不存在!');
		return;
	}

	if (!isFile(srcfilepath)) {
		console.error('文件: `' + srcfilepath + '` 不是文件, 可能是目录吧!');
		return;
	}

	if (has(destfilepath) && !force) {
		console.warn('文件: `' + destfilepath + '` 已存在, 该文件被忽略, 没有被覆盖, 您也可以使用 force 参数强制覆盖!');
		return;
	}

	var pathSections = destfilepath.split('/');

	var fileName = pathSections.pop();
	if (prefix) {
		fileName = prefix + stringUtil.capitalize(fileName);
	}

	var destdirpath = pathSections.join('/');
	if (!destdirpath) {
		destfilepath = fileName;
	} else {
		destfilepath = destdirpath + '/' + fileName;
	}

	var content = readFile(srcfilepath);
	data = data || {};
	data.__filename__ = fileName;
	data.__filepath__ = destfilepath;
	content = stringUtil.format(content, data);
	writeFile(destfilepath, content, force);
}

/**
 * 复制文件夹及各级子文件夹和它们的文件,替换源文件夹中所有文件的占位符
 */
function copyDir(srcdirpath, destdirpath, data, prefix, force) {
	if (!has(srcdirpath)) {
		console.error('目录: `' + srcdirpath + '` 不存在!');
		return;
	}

	if (!isDir(srcdirpath)) {
		console.error('目录: `' + srcdirpath + '` 不是目录, 可能是文件吧!');
		return;
	}

	var fileNames;

	if (has(destdirpath)) {
		fileNames = getFileNames(destdirpath);
		if (fileNames.length && force) {
			delDir(destdirpath);
			createDir(destdirpath);
		} else {
			console.error('目录: `' + destdirpath + '` 已存在, 该目录被忽略, 没有被覆盖, 您也可以使用 force 参数强制覆盖!');
			return;
		}
	} else {
		createDir(destdirpath);
	}



	fileNames = getFileNames(srcdirpath);
	fileNames.forEach(function(fileName) {
		var srcpath = srcdirpath + '/' + fileName;
		var destpath = destdirpath ? destdirpath + '/' + fileName : fileName;
		if (isDir(srcpath)) {
			copyDir(srcpath, destpath, data, prefix, force);
		} else {
			copyFile(srcpath, destpath, data, prefix, force);
		}
	});
}

module.exports = {
	appendFile: appendFile,
	copyFile: copyFile,
	copyDir: copyDir,
	writeFile: writeFile,
	readFile: readFile,
	createDir: createDir,
	has: has
};