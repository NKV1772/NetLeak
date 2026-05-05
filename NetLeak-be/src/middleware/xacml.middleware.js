const userModel = require('../models/user.model')
const roleConfig = require('../configs/config.role')
const POL = require('../configs/config.policy')
const PolicyService = require('../services/policy.service')

function deny(res, policyId, reason) {
    return res.status(403).json({
        message: reason,
        policyId,
        decision: 'Deny'
    })
}

/** P3-RBACPolicy (Word): chi admin truy cap /v1/api/admin/* */
async function requireAdmin(req, res, next) {
    try {
        const enforced = await PolicyService.isPolicyEnabled(POL.P3_RBAC_ADMIN)
        if (!enforced) {
            return next()
        }
        let roles = req.user?.roles
        if (!roles && req.user?.id) {
            const u = await userModel.findById(req.user.id).select('roles').lean()
            roles = u?.roles
        }
        if (String(roles) !== roleConfig.ADMIN) {
            return deny(res, POL.P3_RBAC_ADMIN, 'Admin role required')
        }
        next()
    } catch (err) {
        next(err)
    }
}

/** P2-OwnershipPolicy — so khớp req.params[paramName] với subject.id trong JWT */
function requireResourceOwnerParam(paramName) {
    return async (req, res, next) => {
        try {
            const enforced = await PolicyService.isPolicyEnabled(POL.P2_OWNERSHIP)
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
                return deny(res, POL.P2_OWNERSHIP, 'Resource owner mismatch')
            }
            next()
        } catch (err) {
            next(err)
        }
    }
}

/** P2-OwnershipPolicy — so khớp req.body[field] với subject.id trong JWT */
function requireResourceOwnerBody(fieldName) {
    return async (req, res, next) => {
        try {
            const enforced = await PolicyService.isPolicyEnabled(POL.P2_OWNERSHIP)
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
                return deny(res, POL.P2_OWNERSHIP, 'Resource owner mismatch')
            }
            next()
        } catch (err) {
            next(err)
        }
    }
}

/** P2-OwnershipPolicy — GET query userId */
function requireResourceOwnerQuery(fieldName) {
    return async (req, res, next) => {
        try {
            const enforced = await PolicyService.isPolicyEnabled(POL.P2_OWNERSHIP)
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
                return deny(res, POL.P2_OWNERSHIP, 'Resource owner mismatch')
            }
            next()
        } catch (err) {
            next(err)
        }
    }
}

/** P4-RatingConstraintPolicy — POST /rating: rate trong [0,10] */
async function requireRatingValidRange(req, res, next) {
    try {
        const enforced = await PolicyService.isPolicyEnabled(POL.P4_RATING_CONSTRAINT)
        if (!enforced) {
            return next()
        }
        const rate = req.body?.rate
        if (typeof rate !== 'number' || Number.isNaN(rate)) {
            return deny(res, POL.P4_RATING_CONSTRAINT, 'rate must be a number')
        }
        if (rate < 0 || rate > 10) {
            return deny(res, POL.P4_RATING_CONSTRAINT, 'rate must be between 0 and 10 inclusive')
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
