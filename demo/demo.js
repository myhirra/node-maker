var readline = require('readline'),
	config = require('./config.json'),
	Template = require('../template.js'),
	path = require('path');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var create = function() {
	rl.question("请输入fileName:   ", function(fileName) {
		var fileName = fileName;
		rl.question("请输入methodName:   ", function(methodName) {
			var methodName = methodName;
			var template = new Template({
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
};

var copy = function() {
	rl.question("请输入文件名:      ", function(fileName) {
		var template = new Template({
			codesPath: path.resolve(__dirname + '/codes')
		})
		template.copy(fileName, function(err) {
			if (err) {
				console.log(err);
			}
		});
		rl.close();
	})
};

var help = function() {
	var helpInfo = '-----node template.js create:从模板目录中创建文件' + '\n' +
		'-----node template.js copy:从指定文件中copy文件内容到剪贴板';
	console.log(helpInfo);
}

var inputs = process.argv.slice(2);

switch (inputs[0]) {
	case 'create':
		create();
		break;
	case 'copy':
		copy();
		break;
	default:
		help();
		process.exit(0);
		break;
}