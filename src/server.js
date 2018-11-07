import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'

import setRoutes from './routes'
import usePassport from './passport'
import config from './config'

// Initial Setting

mongoose.set('useFindAndModify', false)
usePassport()

// Express

const app = express()

app.set('port', config.PORT)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '100kb' }))
app.use(passport.initialize())

// Mongoose

mongoose.Promise = global.Promise
mongoose.set('debug', config.MONGODB_DEBUG)
mongoose
    .connect(
        config.MONGODB_URI,
        { useNewUrlParser: true }
    )
    .then(() => {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Connected to MongoDB', config.MONGODB_URI)
        }

        setRoutes(app)

        if (!module.parent) {
            app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
        }
    })
    .catch(err => console.error(err))

export default app
