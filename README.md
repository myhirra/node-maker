#Node-maker

类似于一个简易的模板引擎，可以在本地通过模板创建出项目中需要的文件或者代码。

##1、用法
	
* 安装相应组件`npm install`
* 写入口函数
	
入口函数可以参照demo目录里的写法，demo实现了两种功能。
1) 通过模板生成文件
2) 复制文件内容到剪贴板

	//生成文件
	var template = new Template({
		data: {
			methodName: methodName,
			fileName: fileName
		},
		tempPath: path.resolve(__dirname + '/templates'),
		projectPath: path.resolve(config.projectPath)
	})
	template.create();

	//copy文件内容
	var template = new Template({
		codesPath: path.resolve(__dirname + '/codes')
	})
	template.copy(fileName);

##2、参数

#####1) data

指模板文件tpl里所需要的变量，例如模板文件里用的是{{test}},那data对象里需要给出test对应的值。

#####2) tempPath

指模板文件的目录，要写绝对路径。

#####3) projectPath

输出的文件目录。

#####4) codesPath

指定需要copy到剪贴板的文件的目录。

##3、模板语法

#####1) 头部meta

以/*--开头，以*--/结尾。一般在这写相对`projectPath`的路径

#####2) 代码内容

除了meta的部分就是代码内容。需要渲染的参数以'{{'开头，以'}}'结尾。
例如：{{test}}

#####3) 模板全名规范

*.tpl 。即以tpl为后缀名。