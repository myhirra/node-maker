##Node-maker

类似于一个简易的模板引擎，可以在本地通过模板创建出项目中需要的文件或者代码。

##用法

`
	var Template = require('./template.js');
	var template = new Template(opt);
`

##参数

###data

	指模板文件tpl里所需要的变量，例如模板文件里用的是{{test}},那data对象里需要给出test对应的值。

###tempPath

	指模板文件的目录，要写绝对路径

###projectPath

	输出的文件目录。

##模板语法

###头部meta

	以/*--开头，以*--/结尾。一般在这写相对`projectPath`的路径

###代码内容
	
	除了meta的部分就是代码内容。需要渲染的参数以'{{'开头，以'}}'结尾。
	例如：{{test}}

###模板全名规范
	
	*.tpl 。即以tpl为后缀名。