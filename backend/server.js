const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const { authRoutes } = require('./src/routes/auth')
const { planRoutes } = require('./src/routes/plan')
const { newsRoutes } = require('./src/routes/news')

const app = express()

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}))

// Body parser
app.use(express.json({ limit: '10mb' }))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/plan', planRoutes)
app.use('/api/news', newsRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  })
})

// Serve built frontend static files
const publicPath = path.join(__dirname, 'public')
const fs = require('fs')

if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath))
  // Catch-all route for SPA routing
  app.get('*', (_req, res) => {
    const indexPath = path.join(publicPath, 'index.html')
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath)
    } else {
      res.status(404).json({ success: false, message: 'Frontend not built' })
    }
  })
} else {
  console.log('Warning: public directory not found, serving API only')
}

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    success: false,
    message: err.message || '服务器内部错误',
  })
})

// Start server
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})

module.exports = app
