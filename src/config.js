import dotenv from 'dotenv'
dotenv.config()

export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    SECRET_TOKEN: process.env.SECRET_TOKEN || 'secret-token-here',
    SECRET_TOKEN_EXPIRATION_DAYS: process.env.SECRET_TOKEN_EXPIRATION_DAYS || 10,
    PORT: process.env.PORT || 3001,
    MONGODB_URI: process.env.NODE_ENV === 'test' ? process.env.MONGODB_URI + '_test' : process.env.MONGODB_URI,
    MONGODB_DEBUG: process.env.NODE_ENV === 'test' ? false : process.env.MONGODB_DEBUG || false,

    // if you want use with 'express-session'
    // 'session': {
    //     secret: process.env.SECRET_TOKEN || 'secret-token-here',
    //     cookie: { maxAge: 60000 },
    //     resave: false,
    //     saveUninitialized: false
    // }
}
