/**
 * Nap 4 policy XACML (NetLeak) — PolicyId khớp báo cáo Word (P1–P4).
 *
 * Chay tu thu muc NetLeak-be:
 *   npm run seed:policies
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const policyModel = require('../src/models/policy.model')
const POL = require('../src/configs/config.policy')

const connectString =
    process.env.MONGODB_URI ||
    `mongodb://127.0.0.1:${process.env.DEV_DB_PORT || 27017}/${process.env.DEV_DB_NAME || 'NetLeak'}`

const POLICIES_DIR = path.join(__dirname, '../docs/xacml/policies')

const SEED = [
    {
        policyId: POL.P1_AUTHENTICATION,
        file: 'P1-AuthenticationPolicy.xml',
        title: 'P1 — Authentication Policy (JWT)',
        description:
            'Word 3.3.1: Request /v1/api/user/* bat buoc JWT hop le trong Authorization Bearer.'
    },
    {
        policyId: POL.P3_RBAC_ADMIN,
        file: 'P3-RBACPolicy.xml',
        title: 'P3 — RBAC Admin Policy',
        description:
            'Word 3.3.2: Chi user.roles = admin truy cap /v1/api/admin/*.'
    },
    {
        policyId: POL.P2_OWNERSHIP,
        file: 'P2-OwnershipPolicy.xml',
        title: 'P2 — Ownership Policy',
        description:
            'Word 3.3.3: subject.id khop resource.ownerId — ho so, favorite, saved movie, history.'
    },
    {
        policyId: POL.P4_RATING_CONSTRAINT,
        file: 'P4-RatingConstraintPolicy.xml',
        title: 'P4 — Rating Data Constraint Policy',
        description:
            'Word 3.3.4: POST rating 0 <= rate <= 10; DELETE rating chi chu so huu (rating.email).'
    }
]

async function run() {
    await mongoose.connect(connectString, { maxPoolSize: 10 })
    console.log('MongoDB connected:', connectString.replace(/\/\/.*@/, '//***@'))

    const del = await policyModel.deleteMany({
        policyId: { $in: POL.LEGACY_POLICY_IDS }
    })
    if (del.deletedCount > 0) {
        console.log('Da xoa policyId cu (POL_*):', del.deletedCount)
    }

    for (const row of SEED) {
        const xmlPath = path.join(POLICIES_DIR, row.file)
        if (!fs.existsSync(xmlPath)) {
            console.error('Thieu file:', xmlPath)
            process.exitCode = 1
            continue
        }
        const body = fs.readFileSync(xmlPath, 'utf8')

        const doc = await policyModel.findOneAndUpdate(
            { policyId: row.policyId },
            {
                policyId: row.policyId,
                title: row.title,
                description: row.description,
                format: 'xacml-xml',
                body,
                enabled: true,
                version: '1.0'
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        console.log('OK:', doc.policyId, '—', doc.title)
    }

    const count = await policyModel.countDocuments()
    console.log('Tong policy trong DB:', count)
    await mongoose.disconnect()
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
