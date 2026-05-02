const express = require('express')
const AccessController = require('../../controllers/access.controller')
const AuthService = require('../../services/auth.service')
const AuthController = require('../../controllers/auth.controller')
const PaymentController = require('../../controllers/payment.controller')
const router = express.Router()

// Danh sach goi thanh toan (public — luong dang ky / Pay khong goi admin)
router.get('/payment-packages', PaymentController.listPayments)

// signup
router.post('/signup', AccessController.signUp)
// login
router.post('/login', AccessController.login)
// refresh token
router.post('/refreshToken', AuthController.handleRefreshToken)
// logout
router.post('/logout', AccessController.logout)

module.exports = router