/**
 * Nap 4 policy XACML (NetLeak) vao MongoDB collection Policies.
 *
 * Chay tu thu muc NetLeak-be:
 *   node scripts/seed-xacml-policies.js
 *
 * Can bien MONGODB_URI trong .env (giong app), hoac URI mac dinh localhost.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const policyModel = require('../src/models/policy.model')

const connectString =
    process.env.MONGODB_URI ||
    `mongodb://127.0.0.1:${process.env.DEV_DB_PORT || 27017}/${process.env.DEV_DB_NAME || 'NetLeak'}`

const POLICIES_DIR = path.join(__dirname, '../docs/xacml/policies')

const SEED = [
    {
        policyId: 'POL_USER_AUTHENTICATED_ACCESS',
        file: 'POL_USER_AUTHENTICATED_ACCESS.xml',
        title: 'User API — xac thuc bat buoc',
        description:
            'Chi nguoi da dang nhap (token hop le) truy cap /v1/api/user/* — read/create/update/delete.'
    },
    {
        policyId: 'POL_ADMIN_ONLY_BACKOFFICE',
        file: 'POL_ADMIN_ONLY_BACKOFFICE.xml',
        title: 'Backoffice — chi admin',
        description:
            'Chi role admin truy cap /v1/api/admin/* (catalog, doanh thu, ...).'
    },
    {
        policyId: 'POL_USER_OWNER_DATA_ONLY',
        file: 'POL_USER_OWNER_DATA_ONLY.xml',
        title: 'Du lieu ca nhan — chi owner',
        description:
            'profile, favorite, saved_movie, history: subject.userId phai khop resource.userId.'
    },
    {
        policyId: 'POL_RATING_VALID_RANGE',
        file: 'POL_RATING_VALID_RANGE.xml',
        title: 'Rating — mien gia tri hop le',
        description:
            'create/update rating: authenticated va 0 <= rate <= 10.'
    }
]

async function run() {
    await mongoose.connect(connectString, { maxPoolSize: 10 })
    console.log('MongoDB connected:', connectString.replace(/\/\/.*@/, '//***@'))

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
