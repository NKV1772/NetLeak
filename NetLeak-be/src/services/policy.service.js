const policyModel = require('../models/policy.model')

const CACHE_TTL_MS = 15000
let cache = { map: null, expiresAt: 0 }

function invalidateCache() {
    cache = { map: null, expiresAt: 0 }
}

async function getEnabledMap() {
    if (cache.map && Date.now() < cache.expiresAt) {
        return cache.map
    }
    const rows = await policyModel.find().select('policyId enabled').lean()
    const map = {}
    for (const r of rows) {
        map[r.policyId] = !!r.enabled
    }
    cache = { map, expiresAt: Date.now() + CACHE_TTL_MS }
    return map
}

/**
 * Policy khong co trong DB -> coi nhu bat (enforce).
 * Policy enabled: false -> PEP bo qua enforcement cho policy do.
 */
async function isPolicyEnabled(policyId) {
    try {
        const map = await getEnabledMap()
        if (map[policyId] === undefined) return true
        return map[policyId]
    } catch {
        return true
    }
}

async function listPolicies() {
    return policyModel
        .find()
        .sort({ policyId: 1 })
        .select('policyId title description format enabled version createdAt updatedAt')
        .lean()
}

async function getPolicyByPolicyId(policyId) {
    return policyModel.findOne({ policyId }).lean()
}

async function updatePolicy(policyId, payload) {
    const allowed = ['enabled', 'body', 'title', 'description', 'version']
    const update = {}
    for (const k of allowed) {
        if (payload[k] !== undefined) update[k] = payload[k]
    }
    const doc = await policyModel
        .findOneAndUpdate({ policyId }, { $set: update }, { new: true })
        .lean()
    if (doc) invalidateCache()
    return doc
}

/**
 * PDP don gian: danh gia ngữ canh giong policy XACML trong DB (minh hoa).
 */
function evaluateContext(policyId, ctx = {}) {
    const {
        apiPath = '',
        accessTokenValid = false,
        authenticated = false,
        role = 'user',
        subjectUserId = '',
        resourceUserId = '',
        resourceType = '',
        actionId = '',
        ratingValue = null
    } = ctx

    const path = String(apiPath)
    const tokenOk = accessTokenValid === true || accessTokenValid === 'true'
    const subAuth = authenticated === true || authenticated === 'true'

    switch (policyId) {
        case 'POL_USER_AUTHENTICATED_ACCESS': {
            const match = /\/v1\/api\/user(\/|$)/.test(path)
            if (!match) {
                return {
                    decision: 'NotApplicable',
                    reason: 'Resource khong thuoc prefix /v1/api/user'
                }
            }
            if (tokenOk && subAuth) {
                return { decision: 'Permit', reason: 'Token hop le va subject authenticated' }
            }
            return { decision: 'Deny', reason: 'Thieu token hoac token khong hop le' }
        }
        case 'POL_ADMIN_ONLY_BACKOFFICE': {
            const match = /\/v1\/api\/admin(\/|$)/.test(path)
            if (!match) {
                return {
                    decision: 'NotApplicable',
                    reason: 'Resource khong thuoc prefix /v1/api/admin'
                }
            }
            if (tokenOk && String(role) === 'admin') {
                return { decision: 'Permit', reason: 'subject.role == admin' }
            }
            return { decision: 'Deny', reason: 'Can role admin' }
        }
        case 'POL_USER_OWNER_DATA_ONLY': {
            const types = ['profile', 'favorite', 'saved_movie', 'history']
            if (!types.includes(String(resourceType))) {
                return {
                    decision: 'NotApplicable',
                    reason: 'resourceType khong thuoc profile/favorite/saved_movie/history'
                }
            }
            if (!subAuth) return { decision: 'Deny', reason: 'Chua xac thuc' }
            if (String(subjectUserId) === String(resourceUserId)) {
                return { decision: 'Permit', reason: 'subject.userId == resource.userId' }
            }
            return { decision: 'Deny', reason: 'Resource owner mismatch' }
        }
        case 'POL_RATING_VALID_RANGE': {
            if (String(resourceType) !== 'rating') {
                return { decision: 'NotApplicable', reason: 'resourceType phai la rating' }
            }
            if (!['create', 'update'].includes(String(actionId))) {
                return {
                    decision: 'NotApplicable',
                    reason: 'actionId phai la create hoac update'
                }
            }
            if (!subAuth) return { decision: 'Deny', reason: 'Chua xac thuc' }
            const n = typeof ratingValue === 'number' ? ratingValue : parseInt(ratingValue, 10)
            if (Number.isNaN(n)) {
                return { decision: 'Deny', reason: 'rate phai la so' }
            }
            if (n >= 0 && n <= 10) {
                return { decision: 'Permit', reason: '0 <= rate <= 10' }
            }
            return { decision: 'Deny', reason: 'rate ngoai [0,10]' }
        }
        default:
            return { decision: 'Indeterminate', reason: 'policyId khong ho tro' }
    }
}

async function evaluatePolicy(policyId, context) {
    const policy = await policyModel.findOne({ policyId }).lean()
    if (!policy) {
        return {
            policyId,
            enabled: null,
            ...evaluateContext(policyId, context)
        }
    }
    if (!policy.enabled) {
        return {
            policyId,
            enabled: false,
            decision: 'NotApplicable',
            reason: 'Policy da tat trong DB — PDP khong ap dung enforcement'
        }
    }
    const result = evaluateContext(policyId, context)
    return {
        policyId,
        enabled: true,
        ...result
    }
}

module.exports = {
    isPolicyEnabled,
    listPolicies,
    getPolicyByPolicyId,
    updatePolicy,
    evaluatePolicy,
    invalidateCache,
    evaluateContext
}
