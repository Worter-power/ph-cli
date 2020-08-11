module.exports = {
	root: true, // 作用的目录是根目录
	env: {
		browser: true, // 开发环境配置表示可以使用浏览器的方法
		node: true, //
		commonjs: true,
		es6: true,
		amd: true
	},
	extends: [ // 继承标准规则
		"eslint:recommended",
		"plugin:vue/essential",
		// 'plugin:@typescript-eslint/recommended'
		// 'plugin:vue/base'
	],
	plugins: [
		'html', // 使用eslint-plugin-html
		'vue',
		// '@typescript-eslint'
	],
	parserOptions: {
		// 此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
		parser: "babel-eslint",
		sourceType: 'module', // 按照模块的方式解析
		// "ecmaVersion": 6,
		"ecmaFeatures": {
			"jsx": true
		}
	},
	rules: {
		// 重新覆盖 extends: 'standard'的规则 Severity should be one of the following: 0 = off, 1 = warn, 2 = error (you passed '"warning"').
		"no-undef": 0,// 关闭全局变量检测
		/**
		 * 该vars选项有两个设置：
			all检查所有变量的使用情况，包括全局范围内的变量。这是默认设置。
			local 只检查使用本地声明的变量，但将允许全局变量未被使用。
			该args选项有三个设置：
			  after-used - 只有最后一个参数必须使用。例如，这允许您为函数使用两个命名参数，并且只要您使用第二个参数，ESLint 就不会警告您第一个参数。这是默认设置。
			  all - 必须使用所有命名的参数。
			  none - 不检查参数。
		 */
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'generator-star-spacing': 0,
		indent: 0,
		'indent-legacy': [0, 2],
		"no-unused-vars": [2, { "vars": "all", "args": "none" }], //不允许有声明后未使用的变量或者参数
		"linebreak-style": [0, "error", "windows"],
		"no-fallthrough": 0,
		"no-constant-condition": ["error", { "checkLoops": false }],// 设置此选项false允许循环中的常量表达式。
		"no-empty": ["error", { "allowEmptyCatch": true }], // 允许空catch子句（即不包含注释）
		'space-before-function-paren': [1, { "anonymous": "always", "named": "never" }], // 在函数左括号的前面是否有空格
		'eol-last': 0, // 不检测新文件末尾是否有空行
		'semi': [0], // 必须在语句后面加分号
		"quotes": 0,// ["error", "double"],// 字符串没有使用双引号
		"no-console": ["error", { allow: ["log", "warn", "error"] }],// 允许使用console.log()
		"arrow-parens": 0,
		"no-new": 0, //允许使用 new 关键字
		"no-multiple-empty-lines": [0, { "max": 3 }], //空行最多不能超过100行
		"comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
		'comma-spacing': [1, { 'before': false, 'after': true }],   // 逗号后有空格，前没有空格
		"object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
		"comma-dangle": [2, "never"],//对象字面量项尾不能有逗号
		'key-spacing': [1, { 'beforeColon': false, 'afterColon': true }], // 对象字面量中冒号的前后空格
		'max-statements': [1, 500],  // 单个函数最多500条语句
		'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
		'no-var': 0, // 禁用var，用let和const代替
		'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
		'semi-spacing': [2, { 'before': false, 'after': true }], // 分号前后空格
		'no-unsafe-finally': 0, //允许finally块中的控制流操作
	},
	globals: {// 允许全局变量,将$设置为true，表示允许使用全局变量$
		"document": true,
		"localStorage": true,
		"window": true,
		"jQuery": true,
		$: true,
		_: true,
		request: true,
		Vuex: true,
		BUS: true,
		VueRouter: true,
		Vue: true,
		notification: true,
		LoginBox: true,
		isLogined: true,
		THEME: true,
		InitProject: true,
		fullScreen: true,
		moment: true,
		STORE: true
	},
	overrides: [
		{
			'files': ['*.vue'],
			'rules': {
				'no-trailing-spaces': 'off',
				'@typescript-eslint/indent': 'off'
			}
		}
	]
}