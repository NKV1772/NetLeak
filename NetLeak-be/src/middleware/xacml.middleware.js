const userModel = require('../models/user.model')
const roleConfig = require('../configs/config.role')
const PolicyService = require('../services/policy.service')

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
        const enforced = await PolicyService.isPolicyEnabled('POL_ADMIN_ONLY_BACKOFFICE')
        if (!enforced) {
            return next()
        }
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
    return async (req, res, next) => {
        try {
            const enforced = await PolicyService.isPolicyEnabled('POL_USER_OWNER_DATA_ONLY')
            if (!enforced) {
                return next()
            }
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
        } catch (err) {
            next(err)
        }
    }
}

/** POL_USER_OWNER_DATA_ONLY — so khớp req.body[field] với subject.id trong JWT */
function requireResourceOwnerBody(fieldName) {
    return async (req, res, next) => {
        try {
            const enforced = await PolicyService.isPolicyEnabled('POL_USER_OWNER_DATA_ONLY')
            if (!enforced) {
                return next()
            }
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
        } catch (err) {
            next(err)
        }
    }
}

/** Owner check cho GET có thể truyền userId qua query (body GET thường rỗng). */
function requireResourceOwnerQuery(fieldName) {
    return async (req, res, next) => {
        try {
            const enforced = await PolicyService.isPolicyEnabled('POL_USER_OWNER_DATA_ONLY')
            if (!enforced) {
                return next()
            }
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
        } catch (err) {
            next(err)
        }
    }
}

/** POL_RATING_VALID_RANGE — POST /rating */
async function requireRatingValidRange(req, res, next) {
    try {
        const enforced = await PolicyService.isPolicyEnabled('POL_RATING_VALID_RANGE')
        if (!enforced) {
            return next()
        }
        const rate = req.body?.rate
        if (typeof rate !== 'number' || Number.isNaN(rate)) {
            return deny(res, 'POL_RATING_VALID_RANGE', 'rate must be a number')
        }
        if (rate < 0 || rate > 10) {
            return deny(res, 'POL_RATING_VALID_RANGE', 'rate must be between 0 and 10 inclusive')
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    requireAdmin,
    requireResourceOwnerParam,
    requireResourceOwnerBody,
    requireResourceOwnerQuery,
    requireRatingValidRange
}
