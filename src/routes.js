import * as express from 'express'

import PostController from './controllers/postController'
import UserController from './controllers/userController'

import { authRequired } from './utils/utils'
import { useIdentifyUser, useAuthErrorHandling } from './utils/utils'

export default function setRoutes(app) {
    const router = express.Router()

    const postCtrl = new PostController()
    const userCtrl = new UserController()

    router.use(useIdentifyUser)
    router.use(useAuthErrorHandling)

    // Posts
    router.route('/posts').get(postCtrl.all)
    router.route('/posts').post(postCtrl.store)
    router.route('/posts/count').get(postCtrl.count)
    router.route('/posts/:id').get(postCtrl.get)
    router.route('/posts/:id').put(postCtrl.update)
    router.route('/posts/:id').delete(postCtrl.delete)

    // Users
    router.route('/signin').post(userCtrl.signin)
    router.route('/signup').post(userCtrl.signup)
    router.route('/users').get(authRequired, userCtrl.all, useAuthErrorHandling)
    router.route('/users/count').get(userCtrl.count)
    router.route('/users/:id').get(userCtrl.get)
    router.route('/users/:id').put(userCtrl.update)
    router.route('/users/:id').delete(userCtrl.delete)

    // Apply the routes to our application with the prefix /api
    app.use('/api', router)
}
