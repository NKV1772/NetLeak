const express = require('express')
const AuthService = require('../../services/auth.service')
const UserController = require('../../controllers/user.controller')
const {
    requireResourceOwnerParam,
    requireResourceOwnerBody,
    requireResourceOwnerQuery,
    requireRatingValidRange
} = require('../../middleware/xacml.middleware')

const router = express.Router()

// POL_USER_AUTHENTICATED_ACCESS + POL_ADMIN không áp dụng — giữ nguyên luồng hiện tại

router.get('/listAllUsers', AuthService.verifyToken, UserController.listAllUsers)

router.patch(
    '/updatePassword',
    AuthService.verifyToken,
    requireResourceOwnerBody('id'),
    UserController.updatePassword
)

router.patch(
    '/update/account/:id',
    AuthService.verifyToken,
    requireResourceOwnerParam('id'),
    UserController.updateAccount
)

router.get('/video', AuthService.verifyToken, UserController.getVideo)
router.get('/films/detailFilm', AuthService.verifyToken, UserController.getDetailFilm)
router.get('/films', AuthService.verifyToken, UserController.getFilmsByGenres)

router.get('/ratings', AuthService.verifyToken, UserController.getRatings)

router.post(
    '/rating',
    AuthService.verifyToken,
    requireResourceOwnerBody('emailId'),
    requireRatingValidRange,
    UserController.ratingFilm
)

router.delete(
    '/rating',
    AuthService.verifyToken,
    requireResourceOwnerBody('userId'),
    UserController.deleteRatingFilm
)

router.post(
    '/save',
    AuthService.verifyToken,
    requireResourceOwnerBody('userId'),
    UserController.saveFilm
)

router.get(
    '/savedFilm/:id',
    AuthService.verifyToken,
    requireResourceOwnerParam('id'),
    UserController.getSavedFilm
)

router.get('/ranking', AuthService.verifyToken, UserController.getFilmByRating)

router.delete(
    '/unsaved',
    AuthService.verifyToken,
    requireResourceOwnerBody('userId'),
    UserController.unsaveFilm
)

router.get(
    '/favorite/:userId',
    AuthService.verifyToken,
    requireResourceOwnerParam('userId'),
    UserController.getFavoriteFilmByUserId
)

router.get(
    '/favorite',
    AuthService.verifyToken,
    requireResourceOwnerQuery('userId'),
    UserController.getFavoriteFilm
)

router.post(
    '/favorite',
    AuthService.verifyToken,
    requireResourceOwnerBody('userId'),
    UserController.addFavoriteFilm
)

router.delete(
    '/favorite',
    AuthService.verifyToken,
    requireResourceOwnerBody('userId'),
    UserController.deleteFavoriteFilm
)

router.get(
    '/recommendFavorite/:userId',
    AuthService.verifyToken,
    requireResourceOwnerParam('userId'),
    UserController.getRecommendFromFavorite
)

router.get(
    '/recommend',
    AuthService.verifyToken,
    requireResourceOwnerQuery('userId'),
    UserController.getRecommend
)

router.get('/recommend/genre/:id', AuthService.verifyToken, UserController.getRecommendByGenre)

router.post(
    '/history',
    AuthService.verifyToken,
    requireResourceOwnerBody('userId'),
    UserController.addHistory
)

router.get(
    '/historyFilm/:id',
    AuthService.verifyToken,
    requireResourceOwnerParam('id'),
    UserController.getHistoryFilm
)

router.delete(
    '/historyFilm',
    AuthService.verifyToken,
    requireResourceOwnerBody('userId'),
    UserController.deleteHistoryFilm
)

router.post('/payment', AuthService.verifyToken, UserController.payment)
router.post('/payment/add', AuthService.verifyToken, UserController.addPayment)

module.exports = router
