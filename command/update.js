/**
 * Created by wanghongxiang on 2017/11/2.
 */
'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const path = require('path')
const ora = require('ora')
module.exports =()=>{
    co(function*(){
        let cmdStr = `npm install fed-easy-boilerplate -g`;
        const spinner = ora(chalk.red('更新......')).start();
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = chalk.red('更新中......');
        }, 1000);
        yield (function(){
            return new Promise(function(resolve,reject){
                exec(cmdStr,(error,stdout,stderr)=>{
                    if(error) {
                        console.log(error)
                        process.exit();
                    }
                    resolve()
                })
            })
        })()
        // 处理指定文件夹
        spinner.succeed(chalk.green('更新完成'))
        process.exit()
    })
}