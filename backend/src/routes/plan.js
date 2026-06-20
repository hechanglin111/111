const { Router } = require('express')
const planController = require('../controllers/planController')
const { authenticate } = require('../middleware/auth')

const router = Router()

// All plan routes require authentication
router.use(authenticate)

router.post('/', planController.generatePlan)
router.get('/', planController.getPlan)
router.get('/today', planController.getToday)
router.put('/progress', planController.updateProgress)
router.put('/adjust', planController.adjustPlan)

module.exports = { router: router, planRoutes: router }
