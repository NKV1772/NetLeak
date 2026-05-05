const PolicyService = require('../services/policy.service')

class PolicyController {
    list = async (req, res, next) => {
        try {
            const rows = await PolicyService.listPolicies()
            return res.status(200).json({ success: true, data: rows })
        } catch (e) {
            next(e)
        }
    }

    getById = async (req, res, next) => {
        try {
            const { policyId } = req.params
            const doc = await PolicyService.getPolicyByPolicyId(policyId)
            if (!doc) {
                return res.status(404).json({ success: false, message: 'Policy not found' })
            }
            return res.status(200).json({ success: true, data: doc })
        } catch (e) {
            next(e)
        }
    }

    update = async (req, res, next) => {
        try {
            const { policyId } = req.params
            const doc = await PolicyService.updatePolicy(policyId, req.body)
            if (!doc) {
                return res.status(404).json({ success: false, message: 'Policy not found' })
            }
            return res.status(200).json({ success: true, data: doc })
        } catch (e) {
            next(e)
        }
    }

    evaluate = async (req, res, next) => {
        try {
            const { policyId, context } = req.body || {}
            if (!policyId) {
                return res.status(400).json({
                    success: false,
                    message: 'Body requires policyId'
                })
            }
            const result = await PolicyService.evaluatePolicy(policyId, context || {})
            return res.status(200).json({ success: true, data: result })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PolicyController()
