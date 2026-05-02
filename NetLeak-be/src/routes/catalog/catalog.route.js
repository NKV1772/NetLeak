/**
 * API doc cong khai (chi GET) cho web NetLeak — khong can JWT.
 * Giữ /v1/api/admin/* cho NetLeakAdmin + policy admin.
 */
const express = require('express')
const MovieController = require('../../controllers/movie.controller')
const GenreController = require('../../controllers/genre.controller')
const VideoController = require('../../controllers/video.controller')
const AdminController = require('../../controllers/admin.controller')

const router = express.Router()

router.get('/films', MovieController.getMovies)
router.get('/films/:id', MovieController.getMovie)
router.get('/genres', GenreController.listGenres)
router.get('/videos/:filmId', VideoController.getVideo)
/** Chi tiet user (profile) — khong expose danh sach toan bo users */
router.get('/users/:id', AdminController.getUser)

module.exports = router
