import passport from 'passport'

import User from '../models/User'
import Base from './baseController'

export default class UserController extends Base {
    model = User

    signin = (req, res, next) => {
        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if (err) {
                console.log('Erro')
                console.log(err)
                return next(err)
            }

            if (passportUser) {
                const user = passportUser
                user.token = passportUser.generateJWT()

                return res.json({ user: user.toAuthJSON() })
            }

            res.status(400).json({ error: { message: info } })
        })(req, res, next)
    }

    signup = (req, res) => {
        const obj = new this.model(req.body)
        obj.setPassword(req.body.password)

        return obj.save((err, doc) => {
            if (err) {
                if (err.message.indexOf('duplicate key error') !== -1) {
                    err.message = 'Email already exists'
                    return this._respondError(res, err, 'signup')
                }
                return this._respondError(res, err, 'signup')
            }

            res.json({ user: obj.toAuthJSON() })
        })
    }
}
