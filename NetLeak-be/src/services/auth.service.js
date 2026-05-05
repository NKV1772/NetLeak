const jwt = require('jsonwebtoken')
const paymentModel = require('../models/payment.model')
const userModel = require('../models/user.model')
const getData = require('../utils/formatRes')
const PolicyService = require('./policy.service')
const POL = require('../configs/config.policy')

class AuthService {
    static createAccessToken = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
            expiresIn: '30d'
        })
        return accessToken
    }

    static createRefreshToken = (payload) => {
        const refreshToken = jwt.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d',
        })
        return refreshToken
    }

    static verifyToken = (req, res, next) => {
        ;(async () => {
            let authPolicyEnforced = true
            try {
                authPolicyEnforced = await PolicyService.isPolicyEnabled(POL.P1_AUTHENTICATION)
            } catch (_) {
                authPolicyEnforced = true
            }
            const denyMeta = () =>
                authPolicyEnforced
                    ? {
                          policyId: POL.P1_AUTHENTICATION,
                          decision: 'Deny'
                      }
                    : {}

            const token = req.headers['authorization']
            if (!token) {
                return res.status(401).json({
                    message: 'You are not authorized to access',
                    ...denyMeta()
                })
            }
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Invalid token',
                        ...denyMeta()
                    })
                }
                req.user = user
                next()
            })
        })().catch(next)
    }
    // [POST]v1/api/refreshToken
    static HandleRefreshToken = async (req,res) => {
        const refreshToken = req.cookies.refreshToken
        const decoded = jwt.decode(refreshToken);

        if (decoded) {
            const exitsPayment = await paymentModel.findOne({email: decoded.id})
            if (!exitsPayment) {
                return {
                    success: false,
                    message: "Payment does not exist"
                }
            }
            else{
                if (!refreshToken) {
                    return res.status(401).json({
                        message: 'You are not authorized to access'   
                    })
                }
                jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
                    if (err) {
                        return res.status(403).json({
                            message: 'Invalid token'
                        })
                    }
                    const payload = {
                        id: user.id,
                        email: user.email,
                        roles: user.roles
                    }
                    const newAccessToken = AuthService.createAccessToken(payload)
                    const newRefreshToken = AuthService.createRefreshToken(payload)
                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict",
                        maxAge: 1000 * 60 * 60 * 24 * 14,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14)
                    })
        
                    return res.status(200).json({
                        accessToken: newAccessToken,
                        user: getData({ fields: ['id', 'email'], object: user}),
                    })
                })
            }
        }
        
    }
}

module.exports = AuthService;