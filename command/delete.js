'use strict'
const co = require('co');
const prompt = require('co-prompt')
const config = require('../templates');
const chalk = require('chalk');
const fs = require('fs');

module.exports = ()=>{
	co(function*(){
		let tplName = yield prompt('模板: ');

		if(config.template[tplName]){
			config.template[tplName] = undefined;
		}else{
			console.log(chalk.red("模板不存在"));
			process.exit();
		}
		fs.writeFile(__dirname+'/../templates.json',JSON.stringify(config),'utf-8', (err) =>{
			if (err) console.log(err)
            console.log(chalk.green('模板已被删除!'))
            console.log(chalk.grey('最新模板目录为: \n'))
            console.log(config)
            console.log('\n')
            process.exit()
		})
	})
}