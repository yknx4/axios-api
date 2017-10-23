module.exports = {
  default: require('./dist').default,
  dev: function () { return require('./src') }
}
