import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from '../config'

// ------
// Schema
// ------

const UserSchema = new mongoose.Schema({
    name: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    role: { type: String, default: '', trim: true },
    hash: String,
    salt: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: undefined },
    status: { type: Boolean, default: true },
})

// -----------
// Validations
// -----------

UserSchema.path('name').required(true, 'User name cannot be blank')
UserSchema.path('email').required(true, 'User email cannot be blank')
UserSchema.path('email').validate(function(email, cb) {
    const User = mongoose.model('User')

    // Check only when it is a new user or when email field is modified
    if (this.isNew || this.isModified('email')) {
        return new Promise(function(resolve, reject) {
            return User.find({ email: email }).exec(function(err, users) {
                resolve(!err && users.length === 0)
            })
        })
    }

    return true
}, 'Email already exists')

// -----
// Hooks
// -----

UserSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) {
                return next(error)
            }
            user.password = hash
            next()
        })
    })
})

// -------
// Methods
// -------

// UserSchema.methods.validatePassword2 = function (candidatePassword, callback) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) { return callback(err); }
//         callback(null, isMatch);
//     });
// };

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
}

UserSchema.methods.generateJWT = function() {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + config.SECRET_TOKEN_EXPIRATION_DAYS)

    return jwt.sign(
        {
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        },
        config.SECRET_TOKEN
    )
}

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    }
}

// ----
// Sets
// ----

UserSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password
        return ret
    },
})

// -------
// Statics
// -------

UserSchema.statics = {
    getById: function(_id) {
        return this.findOne({ _id }).exec()
    },

    list: function(options) {
        const criteria = options.criteria || {}
        const page = options.page || 0
        const limit = options.limit || 30
        return this.find(criteria)
            .sort({ created_at: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec()
    },
}

export default mongoose.models.User || mongoose.model('User', UserSchema)
