const request = require('request')
const semver = require('semver')
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const updatePackage = require('./update')
const packageConfig = require('../package.json')

module.exports = done => {

  request({
    url: 'https://registry.npmjs.org/fed-easy-boilerplate',
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log()
        console.log(chalk.yellow('  A newer version of fed-easy-boilerplate is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
        co(function* () {
          let update = yield prompt('Do you want to update the package ? [Y/N]')
          if (update.toLowerCase() === 'y' || update.toLowerCase() === 'yes') {
            updatePackage()
          } else if (update.toLowerCase() === 'n' || update.toLowerCase() === 'no') {
            done()
          }
        })
      } else {
        done()
      }
    } else {
      done()
    }
  })
}
