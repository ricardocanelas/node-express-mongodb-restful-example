import { respond } from '../utils/utils'

export default class BaseContrroller {
    model

    _respondError = (res, err, endpoint = undefined, status = 442) => {
        const out = { error: { model: '', endpoint: '', message: '', type: '' } }

        out.error.message = err._message || err.message
        out.error.type = err.name
        out.error.model = this.model.collection.collectionName
        out.error.endpoint = endpoint || ''

        if (err.errors) out.error.errors = err.errors

        respond(res, status, out)
    }

    _respondOk = (res, data, status_code = 200) => {
        res.status(status_code).json({ status: 'OK', data: data })
    }

    get = (req, res) => {
        this.model.findOne({ _id: req.params.id }, (err, doc) => {
            if (err) {
                this._respondError(res, err, 'get')
            }
            this._respondOk(res, doc)
        })
    }

    all = (req, res) => {
        this.model.find({}, (err, docs) => {
            if (err) {
                this._respondError(res, err, 'all')
            }
            this._respondOk(res, docs)
        })
    }

    count = (req, res) => {
        this.model.countDocuments(
            {}, // filter
            (err, count) => {
                if (err) {
                    this._respondError(res, err, 'count')
                }
                res.status(200).json({ count: count, status: 'OK' })
            }
        )
    }

    store = (req, res) => {
        const obj = new this.model(req.body)
        obj.save((err, doc) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                res.sendStatus(400)
            }
            if (err) {
                this._respondError(res, err, 'store')
            }

            this._respondOk(res, doc)
        })
    }

    update = (req, res) => {
        this.model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, doc) => {
            if (err) {
                this._respondError(res, err, 'update')
            }
            this._respondOk(res, doc)
        })
    }

    delete = (req, res) => {
        this.model.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
            if (err) {
                this._respondError(res, err, 'delete')
            }
            this._respondOk(res, doc)
        })
    }
}
