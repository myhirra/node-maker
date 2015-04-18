/**
 * 工具类
 * @author hirra
 * @description 新建模板：根据controller名，创建模板
 */

var fs = require('fs'),
	path = require('path'),
	child_process = require('child_process'),
	dateFormat = require('./libs/date').format,
	getUserInfo = require('./libs/svn').getUserInfo;

var TEMP_PATH = __dirname + '/templates/',
	DIR_PATH = __dirname + '/../../';

/**
 * Template构造函数
 */
function Template(opt) {
	this._init(opt);
}

Template.prototype._init = function(opt) {
	opt = opt || {};
	opt.tempPath = opt.tempPath || TEMP_PATH;
	opt.dirPath = opt.dirPath || DIR_PATH;

	this.data = opt.data || {};
	this.opt = opt;
};

/**
 * 真正的创建函数
 */
Template.prototype.create = function() {
	var self = this,
		tempPath = this.opt.tempPath;

	this._read(tempPath, function(content) {
		var result = self._parse(content);
		self._write(result, function() {

		})
	})
};

Template.prototype.delete = function() {

};

/**
 * 读文件
 * @param  {Function} callback [description]
 */
Template.prototype._read = function(tempPath, callback) {
	fs.readdir(tempPath, function(err, files) {
		files.map(function(item, index) {
			//拿到拼凑好的路径
			var realPath = tempPath + '/' + item;
			if (fs.statSync(realPath).isDirectory()) {
				Template.prototype._read(realPath, callback);
			} else {
				var ext = path.extname(realPath);
				if (ext === '.tpl') {
					fs.readFile(realPath, 'utf-8', function(err, content) {
						if (!err) {
							callback && callback(content);
						} else {
							console.log('_read error:' + error)
						}
					})
				}

			}
		})
	})
}

/**
 * 写文件
 * @param  {[type]}   fileInfo :{filepath:'路径',filebody:'内容'}
 * @param  {Function} callback [description]
 */
Template.prototype._write = function(fileInfo, callback) {
	fileInfo = fileInfo || {};

	var filepath = fileInfo.filepath,
		content = fileInfo.body,
		filedir = '';

	filedir = path.dirname(filepath);
	this._mkdirs(filedir, function() {
		fs.exists(filepath, function(exists) {
			if (!exists) {
				fs.writeFile(filepath, content, function(err) {
					if (!err) {
						callback && callback();
					} else {
						console.log('_write error:' + err);
					}
				});
			}
		})
	})
}

/**
 * 解析文件
 * @param  {[type]}   content  [description]
 * @return {[type]}            [description]
 */
Template.prototype._parse = function(content, callback) {

	var self = this;

	/*
	 	leftFlag:左侧开始符
	 	rightFlag:右侧结束符
	 	meta:头部信息
	 	body:真正内容
	 	data:一般是指要替换掉的那一堆数据
	 */
	var leftFlag = '{{',
		rightFlag = '}}',
		meta = {
			oMeta: '',
			fMeta: ''
		},
		filepath = '',
		filedir = '',
		body = '',
		data = this.data,
		projectPath = this.opt.projectPath;

	content = content.replace(new RegExp(leftFlag + '(\\w+)' + rightFlag, 'g'), function() {
		return data[arguments[1]];
	});

	meta = self._findMeta(content);
	body = content.replace(meta.oMeta, '').trim();
	filepath = meta.fMeta;

	//如果不是采用绝对路径，则最终路径应该邮projectPath和头部路径拼命起来
	filepath = projectPath + '/' + meta.fMeta;

	callback && callback({
		filepath: filepath,
		body: body,
	})

	return {
		filepath: filepath,
		body: body,
	};
}

/**
 * 递归创建目录
 */
Template.prototype._mkdirs = function(dirpath, callback) {
	var self = this;
	fs.exists(dirpath, function(exists) {
		if (exists) {
			callback && callback(dirpath);
		} else {
			//尝试创建父目录，然后再创建当前目录
			self._mkdirs(path.dirname(dirpath), function() {
				fs.mkdir(dirpath, callback);
			});
		}
	});
};

/**
 * 找到文件的头信息
 * @param  {[type]} content [description]
 * @return {[type]}         [description]
 */
Template.prototype._findMeta = function(content) {

	var leftFlag = '/*--',
		rightFlag = '--*/',
		leftIndex = 0,
		rightIndex = 0;

	/*
		oMeta:原始的信息 
		fMeta:去掉头、尾标记后的信息
	 */
	var fMeta = '',
		oMeta = '';

	leftIndex = content.indexOf(leftFlag);
	rightIndex = content.indexOf(rightFlag);

	fMeta = content.substring(leftIndex + leftFlag.length, rightIndex).trim();
	oMeta = content.substring(leftIndex, rightIndex + rightFlag.length).trim();

	return {
		oMeta: oMeta,
		fMeta: fMeta
	};
}

module.exports = Template;