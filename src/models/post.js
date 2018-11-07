import mongoose from 'mongoose'

// ------
// Schema
// ------

const PostSchema = new mongoose.Schema({
    title: { type: String, default: '', trim: true },
    body: { type: String, default: '', trim: true },
    author: { type: String, default: '', trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: undefined },
    status: { type: Boolean, default: true },
})

// -----------
// Validations
// -----------

PostSchema.path('title').required(true, 'Post title cannot be blank')
PostSchema.path('body').required(true, 'Post body cannot be blank')
PostSchema.path('author').required(true, 'Post author cannot be blank')

// -----
// Hooks
// -----

PostSchema.pre('remove', function(next) {
    next()
})

// -------
// Methods
// -------

PostSchema.methods = {}

// -------
// Statics
// -------

PostSchema.statics = {
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

export default mongoose.models.Post || mongoose.model('Post', PostSchema)
