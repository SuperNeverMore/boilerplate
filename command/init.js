'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports =()=>{
	co(function*(){
		let projectName = yield prompt('项目名称为: ')
		let tplName = yield prompt('模板名称为: ');
		let gitUrl;
		let branch;
		if (tplName) {
			if(!config.template[tplName]){
				console.log(chalk.red('\n 模板不存在'))
				process.exit();
			} else {
				gitUrl = config.template[tplName].url;
				branch = config.template[tplName].branch;
			}
		} else {
			gitUrl = config.template['website'].url;
			branch = config.template['website'].branch;
		}
		let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch}`;
		console.log(chalk.white('\n 开始构建...'))
		exec(cmdStr,(error,stdout,stderr)=>{
			if(error){
				console.log(error)
				process.exit();
			}
			console.log(chalk.green('\n ✔️ 构建完成'))
			console.log(`\n cd ${projectName} && npm install \n`);
			process.exit();
		})
	})
}