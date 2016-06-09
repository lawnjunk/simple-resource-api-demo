'use strict'

// set env vars
process.env.APP_SECRET = process.env.APP_SECRET || 'slugs are secret'
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test'

const expect = require('chai').expect
const request = require('superagent-use')
const superPromse = require('superagent-promise-plugin')
const debug = require('debug')('authdemo:auth-router-test')

const authController = require('../controller/auth-controller')
const port = process.env.PORT || 3000
const baseURL = `localhost:${port}/api`
const server = require('../server')
request.use(superPromse)

describe('testing module auth-router', function(){
  before((done) => {
    if (! server.isRunning) {
      server.listen(port, () => {
        server.isRunning = true
        debug(`server up ::: ${port}`)
        done()
      })
      return
    }
    done()
  })

  after((done) => {
    if (server.isRunning) {
      server.close(() => {
        server.isRunning = false 
        debug('server down')
        done()
      })
      return
    }
    done()
  })

  describe('testing POST /api/signup', function(){
    after((done) => {
      authController.removeAllUsers()
      .then(() => done())
      .catch(done)
    })

    it('should return a token', function(done){
      request.post(`${baseURL}/signup`)
      .send({
        username: 'slug', 
        password: 'slug123'
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.text.length).to.equal(203)
        done()
      })
      .catch(done)
    })
  })

  describe('testing GET /api/signin', function(){
    before((done) => {
      authController.signup({username: 'slug', password: '1234'}) 
      .then(() => done())
      .catch(done)
    })

    after((done) => {
      authController.removeAllUsers()
      .then(() => done())
      .catch(done)
    })

    it('should return a token', function(done){
      request.get(`${baseURL}/signin`)
      .auth('slug', '1234')
      .then( res => {
        expect(res.status).to.equal(200)
        expect(res.text.length).to.equal(203)
        done()
      })
      .catch(done)

    })
  })
})
