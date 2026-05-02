const userModel = require('../models/user.model')
const roleConfig = require('../configs/config.role')

function deny(res, policyId, reason) {
    return res.status(403).json({
        message: reason,
        policyId,
        decision: 'Deny'
    })
}

/** POL_ADMIN_ONLY_BACKOFFICE */
async function requireAdmin(req, res, next) {
    try {
        let roles = req.user?.roles
        if (!roles && req.user?.id) {
            const u = await userModel.findById(req.user.id).select('roles').lean()
            roles = u?.roles
        }
        if (String(roles) !== roleConfig.ADMIN) {
            return deny(res, 'POL_ADMIN_ONLY_BACKOFFICE', 'Admin role required')
        }
        next()
    } catch (err) {
        next(err)
    }
}

/** POL_USER_OWNER_DATA_ONLY — so khớp req.params[paramName] với subject.id trong JWT */
function requireResourceOwnerParam(paramName) {
    return (req, res, next) => {
        const subjectId = req.user?.id
        const resourceId = req.params[paramName]
        if (
            subjectId === undefined ||
            resourceId === undefined ||
            String(subjectId) !== String(resourceId)
        ) {
            return deny(res, 'POL_USER_OWNER_DATA_ONLY', 'Resource owner mismatch')
        }
        next()
    }
}

/** POL_USER_OWNER_DATA_ONLY — so khớp req.body[field] với subject.id trong JWT */
function requireResourceOwnerBody(fieldName) {
    return (req, res, next) => {
        const subjectId = req.user?.id
        const resourceId = req.body?.[fieldName]
        if (
            subjectId === undefined ||
            resourceId === undefined ||
            resourceId === null ||
            String(subjectId) !== String(resourceId)
        ) {
            return deny(res, 'POL_USER_OWNER_DATA_ONLY', 'Resource owner mismatch')
        }
        next()
    }
}

/** Owner check cho GET có thể truyền userId qua query (body GET thường rỗng). */
function requireResourceOwnerQuery(fieldName) {
    return (req, res, next) => {
        const subjectId = req.user?.id
        const resourceId = req.query?.[fieldName]
        if (
            subjectId === undefined ||
            resourceId === undefined ||
            resourceId === null ||
            String(subjectId) !== String(resourceId)
        ) {
            return deny(res, 'POL_USER_OWNER_DATA_ONLY', 'Resource owner mismatch')
        }
        next()
    }
}

/** POL_RATING_VALID_RANGE — POST /rating */
function requireRatingValidRange(req, res, next) {
    const rate = req.body?.rate
    if (typeof rate !== 'number' || Number.isNaN(rate)) {
        return deny(res, 'POL_RATING_VALID_RANGE', 'rate must be a number')
    }
    if (rate < 0 || rate > 10) {
        return deny(res, 'POL_RATING_VALID_RANGE', 'rate must be between 0 and 10 inclusive')
    }
    next()
}

module.exports = {
    requireAdmin,
    requireResourceOwnerParam,
    requireResourceOwnerBody,
    requireResourceOwnerQuery,
    requireRatingValidRange
}
