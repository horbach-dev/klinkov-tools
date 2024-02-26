const fs = require('fs')
const path = require('path')
const jsYaml = require('js-yaml')

module.exports = env => {
  const config = jsYaml.load(fs.readFileSync(path.join(__dirname, './config.yml')))

  return Object.assign(config.common, config[env])
}
