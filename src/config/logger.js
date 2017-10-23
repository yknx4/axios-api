import debug from 'debug'

function setupLogger () {
  global.logger = {}
  global.logger.trace = debug('axios-api:trace')
  global.logger.debug = debug('axios-api:debug')
  global.logger.info = debug('axios-api:info')
  global.logger.warn = debug('axios-api:warn')
  global.logger.error = debug('axios-api:error')
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
