import bunyan from 'bunyan'

function setupLogger () {
  global.logger = bunyan.createLogger({
    name: config.APP_NAME,
    src: config.ENVIRONMENT !== 'production',
    streams: [config.bunyanStream]
  })
}
if (global.logger == null) {
  console.log('Initializing Logger')
  setupLogger()
  global.logger.info('Logger Initialized')
  process.on('unhandledRejection', error => {
    global.logger.warn('Unhandle Promise Rejection!')
    global.logger.error(error)
  })
}
