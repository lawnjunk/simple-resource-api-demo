'use strict'

const debug = require('debug')('authdemo:server-test-controller')
const server = require('../../server')
const port = process.env.PORT || 3000;

exports.startServer = function(done){
  debug('startServer')
  if (! server.isRunning) {
    server.listen(port, () => {
      server.isRunning = true
      debug(`server up ::: ${port}`)
      done()
    })
    return
  }
  done()
}

exports.stopServer = function(done){
  debug('stopServer')
  if (server.isRunning) {
    server.close(() => {
      server.isRunning = false
      debug('server down')
      done()
    })
    return
  }
  done()
}
