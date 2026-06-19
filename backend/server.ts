import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import path from 'path'
import { authRoutes } from './src/routes/auth'
import { planRoutes } from './src/routes/plan'
import { newsRoutes } from './src/routes/news'

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
app.use(express.static(path.join(__dirname, 'dist')))

// Catch-all route for SPA routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
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

export default app
