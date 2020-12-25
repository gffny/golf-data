class TestReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunComplete(_, results) {
    if (results.numFailedTestSuites === 0 && results.numFailedTests === 0) {
      // eslint-disable-next-line no-console
      console.log('All Tests Passed')
    }
  }
}

module.exports = TestReporter
