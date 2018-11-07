import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it, beforeEach } from 'mocha'

import app from '../server'
import User from '../models/user'

// Configure chai

chai.use(chaiHttp)
chai.should()

describe('Users', () => {
    beforeEach(done => {
        User.deleteMany({}, err => {
            done()
        })
    })

    describe('API', () => {
        it('should get users count', done => {
            chai.request(app)
                .get('/api/users/count')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('count')
                    res.body.count.should.be.a('number')
                    res.body.count.should.be.eql(0)
                    done()
                })
        })

        it('should sign up', done => {
            const data = {
                email: 'my@mail.com',
                password: 'password',
                name: 'Ricardo',
            }

            chai.request(app)
                .post('/api/signup')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.user.should.have.a.property('_id')
                    res.body.user.should.have.a.property('email')
                    res.body.user.should.have.a.property('token')
                    done()
                })
        })

        it('should sign in', done => {
            const user = new User({
                email: 'my@mail.com',
                name: 'Ricardo',
            })
            user.setPassword('password')
            user.save((error, newUser) => {
                chai.request(app)
                    .post('/api/signin')
                    .send({ email: 'my@mail.com', password: 'password' })
                    .end((err, res) => {
                        res.body.should.be.a('object')
                        res.body.user.should.have.a.property('_id')
                        res.body.user.should.have.a.property('email')
                        res.body.user.should.have.a.property('token')
                        done()
                    })
            })
        })

        it('should get all users using a token', done => {
            const user = new User({
                email: 'my@mail.com',
                name: 'Ricardo',
            })
            user.setPassword('password')
            user.save((error, newUser) => {
                const token = newUser.generateJWT()
                chai.request(app)
                    .get('/api/users')
                    .set('authorization', token)
                    .end((err, res) => {
                        res.body.should.be.a('object')
                        res.body.should.have.a.property('status')
                        res.body.data.should.be.a('array')
                        done()
                    })
            })
        })

        it('should get an error when try to get all users without a token', done => {
            const user = new User({
                email: 'my@mail.com',
                name: 'Ricardo',
            })
            user.setPassword('password')
            user.save((error, newUser) => {
                chai.request(app)
                    .get('/api/users')
                    .end((err, res) => {
                        res.body.should.be.a('object')
                        res.body.should.have.a.property('error')
                        done()
                    })
            })
        })
    })
})
