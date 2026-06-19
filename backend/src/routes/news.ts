import { Router } from 'express'
import * as newsController from '../controllers/newsController'
import { authenticate } from '../middleware/auth'

const router = Router()

// Public routes
router.get('/', newsController.list)
router.get('/:id', newsController.getById)

// Authenticated routes
router.post('/:id/favorite', authenticate, newsController.toggleFavorite)

export { router as newsRoutes }
