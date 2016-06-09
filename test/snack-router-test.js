'use strict'

// set env vars
process.env.APP_SECRET = process.env.APP_SECRET || 'slugs are secret'
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test'

const expect = require('chai').expect
const request = require('superagent-use')
const superPromse = require('superagent-promise-plugin')
const debug = require('debug')('authdemo:snack-router-test')

const authController = require('../controller/auth-controller')
const userController = require('../controller/user-controller')
const snackController = require('../controller/snack-controller')
const port = process.env.PORT || 3000
const baseURL = `localhost:${port}/api`
const server = require('../server')
request.use(superPromse)

describe('testing module snack-router', function(){
  before((done) => {
    debug('before all module snack-roter')
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
    debug('after all module snack-roter')
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

  beforeEach((done) => {
    debug('beforeEach module snack-router')
    authController.signup({username: 'demouser', password: 'testpassword'})
    .then( token => this.tempToken = token)
    .then( () => done())
    .catch(done)
  })

  afterEach((done) => {
    debug('afterEach module snack-router')
    Promise.all([
      userController.removeAllUsers()
        , snackController.removeAllSnacks()
    ])
    .then(() => done())
    .catch(done)
  })

  describe('testing POST /api/snack', () => {
    it('should return a token', (done) => {
      debug('test POST /api/snack')
      request.post(`${baseURL}/snack`)
      .send({
        name: 'yum bowl'
        , description: 'when you get hungr'
        , ingredients: ['bugs', 'slugs', 'a', 'b' ]
      })
      .set({
        Authorization: `Bearer ${this.tempToken}`
      })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body.name).to.equal('yum bowl')
        expect(res.body.description).to.equal('when you get hungr')
        done()
      })
      .catch(done)
    })
  })

  describe('testing GET /api/snack/all', () => {
    before((done) => {
      before('before GET /api/snack/all')
      authController.signup({username: 'testuser', password: 'testpassword'})
      .then( token => {
        this.token = token
        const snackOneRequest = request.post(`${baseURL}/snack`)
        .send({
          name: 'yum bowl'
          , description: 'when you get hungr'
          , ingredients: ['bugs', 'slugs', 'a', 'b' ]
        })
        .set({ Authorization: `Bearer ${this.token}` })

        const snackTwoRequest = request.post(`${baseURL}/snack`)
        .send({
          name: 'two bowl'
          , description: 'food '
          , ingredients: ['a', 'b', 'c', 'd' ]
        })
        .set({ Authorization: `Bearer ${this.token}` })

        Promise.all([
          , snackOneRequest
          , snackTwoRequest
        ])
        .then( results => this.results = results)
        .then( () => done())
        .catch(done)
      })
      .catch(done)
    })

    it('should return an array of two snacks', (done) => {
      debug('test GET /api/snack/all')
      request.get(`${baseURL}/snack/all`)
      .set({ Authorization: `Bearer ${this.token}` })
      .then(res => {
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(2)
        done()
      })
      .catch(done)
    })
  })
})
