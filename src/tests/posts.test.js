import chai from 'chai'
import chaiHttp from 'chai-http'
import { describe, it, beforeEach } from 'mocha'

import app from '../server'
import Post from '../models/post'

// Configure chai

chai.use(chaiHttp)
chai.should()

describe('Posts', () => {
    beforeEach(done => {
        Post.deleteMany({}, err => {
            done()
        })
    })

    describe('API', () => {
        it('should get all the posts', done => {
            chai.request(app)
                .get('/api/posts')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('data')
                    res.body.data.should.be.an('array')
                    res.body.data.should.have.lengthOf(0)
                    done()
                })
        })

        it('should get posts count', done => {
            chai.request(app)
                .get('/api/posts/count')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('count')
                    res.body.count.should.be.a('number')
                    res.body.count.should.be.eql(0)
                    done()
                })
        })

        it('should create new post', done => {
            const data = new Post({ title: 'First Post', body: 'My content', author: 'Ricardo' })
            chai.request(app)
                .post('/api/posts')
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.a.nested.property('data.title')
                    res.body.should.have.a.nested.property('data.body')
                    res.body.should.have.a.nested.property('data.author')
                    done()
                })
        })

        it('should get a post by its id', done => {
            const post = new Post({ title: 'First Post', body: 'My content', author: 'Ricardo' })
            post.save((error, newPost) => {
                chai.request(app)
                    .get(`/api/posts/${newPost.id}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.data.should.have.property('title')
                        res.body.data.should.have.property('body')
                        res.body.data.should.have.property('author')
                        res.body.data.should.have.property('_id').eql(newPost.id)
                        done()
                    })
            })
        })

        it('should update a post by its id', done => {
            const post = new Post({ title: 'First Post', body: 'My content', author: 'Ricardo' })
            post.save((error, newPost) => {
                chai.request(app)
                    .put(`/api/posts/${newPost.id}`)
                    .send({ title: 'Updated the Post' })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.data.should.have.property('title').eql('Updated the Post')
                        done()
                    })
            })
        })

        it('should delete a post by its id', done => {
            const post = new Post({ title: 'First Post', body: 'My content', author: 'Ricardo' })
            post.save((error, newPost) => {
                chai.request(app)
                    .del(`/api/posts/${newPost.id}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        done()
                    })
            })
        })
    })
})
