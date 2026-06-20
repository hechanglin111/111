const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: '未提供认证令牌' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, message: '无效的认证令牌格式' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: '认证令牌无效或已过期' })
  }
}

module.exports = { authenticate }
