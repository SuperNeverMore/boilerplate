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
		let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch} && git remote remove origin`;
		console.log(chalk.white('\n 开始构建...'))
		yield (function(){
			return new Promise(function(resolve,reject){
				exec(cmdStr,(error,stdout,stderr)=>{
					if(error){
						console.log(error)
						process.exit();
					}
					console.log(chalk.green('√ ️ 构建完成'))
					console.log(`请运行: \n cd ${projectName} && npm install \n`);
					exec(`rm -rf ./${projectName}/.git || rd/s/q ./${projectName}/.git`,(error,stdout,stderr) => {
						process.exit();
					})
					resolve()
				})
			})
		})()
	})
}