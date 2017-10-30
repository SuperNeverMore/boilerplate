'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')

const writeMyData = function (v,origin) {
    return new Promise(function (resolve, reject) {
            var ori = JSON.stringify(origin)
            var data = JSON.parse(ori).replace(/"version"\s*:.*/g, "\"version\": "+"\""+ v+ "\",")
            fs.writeFileSync(process.cwd() + '/package.json',data,'utf-8',(err)=>{
                if(err)console.log(err);
            })
            console.log(chalk.green('新版本已添加!'));
            console.log(chalk.green('当前需要发布的版本为: ' + v));
            resolve('success')
        })    
    }
module.exports =()=>{
    co(function*(){
        console.log(chalk.red('暂时不支持发布，等待更新。。。。'))
        process.exit()
        let version = yield prompt('请输入需要发布的版本号: ')
        while(!version){
            version = yield prompt('请重新输入需要发布的版本号: ')
        }
        if (!fs.existsSync(process.cwd() + '/package.json')) {
            console.error('package.json不存在，请切换目录');
            process.exit();
        }
        var data = fs.readFileSync(process.cwd() + '/package.json').toString()
        yield writeMyData(version,data);
        // console.log(chalk.red('准备提交package.json....'))
        var gitcmd = 'git pull origin master&& git add -A && git commit -m "更新package.json" && git push'
        var gitcmd = 'git checkout package.json'
        yield function () {
            return new Promise(function (resolve,reject){
                exec(gitcmd, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err)
                        process.exit()
                    }
                    console.log(chalk.green('开始发布......'))
                })
                resolve('sdsd')
            })
        }()
        var cmdStr = `npm publish`;
        console.log(chalk.red('发布中。。。。。'))
        exec(cmdStr, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                console.log(chalk.grey('请确定是否已经注册npm，如果已经注册请确定是否已经切换到官方镜像'))
                console.log(chalk.red('请尝试执行npm config set registry  http://registry.npmjs.org/'))
                process.exit()
            }
            console.log(chalk.green('\n ✔️ 发布完成'))
            process.exit();
        })
    })
}