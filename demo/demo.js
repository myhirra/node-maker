var readline = require('readline'),
	config = require('./config.json'),
	Template = require('../template.js'),
	path = require('path');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var template = {};

rl.question("请输入fileName:   ", function(fileName) {
	var fileName = fileName;
	rl.question("请输入methodName:   ", function(methodName) {
		var methodName = methodName;
		template = new Template({
			data: {
				methodName: methodName,
				fileName: fileName
			},
			tempPath: path.resolve(__dirname + '/templates'),
			projectPath: path.resolve(config.projectPath)
		})
		template.create();
		rl.close();
	})
});