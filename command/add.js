'use strict'
const co = require('co');
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk');
const fs = require('fs');

module.exports = ()=>{
	co(function* (){
		let tplName = yield prompt('模板名称: ');
		let gitUrl = yield prompt('Git https 地址: ');
		let branch = yield prompt('分支名称: ')

		if(!config.template[tplName]){
			config.template[tplName] = {};
			config.template[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
			config.template[tplName]['branch'] =branch;
		}else{
			console.log(chalk.red('模板已经存在'));
			process.exit();
		}

		fs.writeFile(__dirname+'/../templates.json',JSON.stringify(config),'utf-8',(err)=>{
			if(err)console.log(err);
			console.log(chalk.green('新模板已添加!\n'));
			console.log(chalk.grey('模板列表为: \n'));
			console.log(config);
			console.log('\n');
			process.exit();
		})
	})
}