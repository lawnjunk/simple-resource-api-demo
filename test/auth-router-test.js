'use strict'

process.env.APP_SECRET = 'slugs are secret'

const expect = require('chai').expect
const request = require('superagent-use')
const superPromse = require('superagent-promise-plugin')
request.use(superPromse)

const authController = require('../controller/auth-controller')
const port = process.env.PORT || 3000
const baseURL = `localhost:${port}/api`
require('../server')

describe('testing module auth-router', function(){
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
        console.log(res.text)
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
        console.log(res.text);

        request.get(`${baseURL}/wat`)
        .set('authorization', `Bearer ${res.text}`)
        .then((res) => {
          console.log('userid res.text', res.text)
          done()
        });
      })
      .catch(done)

    })
  })
})
