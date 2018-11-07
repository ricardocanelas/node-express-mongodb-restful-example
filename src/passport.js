import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from './models/user'

export default () => {
    passport.use(
        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, function(username, password, done) {
            User.findOne({ email: username }, function(err, user) {
                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false, {
                        errors: { message: 'Incorrect username.' },
                    })
                }

                if (!user.validatePassword(password)) {
                    return done(null, false, {
                        errors: { message: 'Incorrect password.' },
                    })
                }

                return done(null, user)
            }).catch(done)
        })
    )
}
