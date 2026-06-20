const { Router } = require('express')
const newsController = require('../controllers/newsController')
const { authenticate } = require('../middleware/auth')

const router = Router()

// Public routes
router.get('/', newsController.list)
router.get('/:id', newsController.getById)

// Authenticated routes
router.post('/:id/favorite', authenticate, newsController.toggleFavorite)

module.exports = { router: router, newsRoutes: router }
