const env = {
  development: {
    verbose: true,
    bail: false,
    notify: true
  },
  test: {
    verbose: false,
    bail: true,
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/testServer.js',
      '!src/config/logger.js',
      '!src/**/index.js',
      '!src/**/config.js'
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: {
        branches: 75,
        functions: 75,
        lines: 75,
        statements: 75
      }
    }
  }
}

const config = {
  setupFiles: ['./jest-setup.js'],
  setupTestFrameworkScriptFile: './node_modules/jasmine-expect/index.js',
  unmockedModulePathPatterns: ['jasmine-expect']
}

module.exports = Object.assign({}, config, env[process.env.ENVIRONMENT])
