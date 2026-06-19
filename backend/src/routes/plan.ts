import { Router } from 'express'
import * as planController from '../controllers/planController'
import { authenticate } from '../middleware/auth'

const router = Router()

// All plan routes require authentication
router.use(authenticate)

router.post('/', planController.generatePlan)
router.get('/', planController.getPlan)
router.get('/today', planController.getToday)
router.put('/progress', planController.updateProgress)
router.put('/adjust', planController.adjustPlan)

export { router as planRoutes }
