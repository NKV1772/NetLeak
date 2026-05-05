const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Policy'
const COLLECTION_NAME = 'Policies'

const policySchema = new Schema(
    {
        policyId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        format: {
            type: String,
            default: 'xacml-xml'
        },
        body: {
            type: String,
            required: true
        },
        enabled: {
            type: Boolean,
            default: true
        },
        version: {
            type: String,
            default: '1.0'
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

policySchema.index({ policyId: 1 }, { unique: true })

module.exports = model(DOCUMENT_NAME, policySchema)
