const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { prisma } = require('../utils/prisma')
const { success, error } = require('../utils/response')

function generateToken(userId, email) {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user
  return safeUser
}

async function register(req, res) {
  try {
    const { email, password, name } = req.body

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json(error('邮箱和密码为必填项'))
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json(error('邮箱格式不正确'))
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json(error('密码长度不能少于6位'))
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json(error('该邮箱已被注册'))
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
      },
    })

    // Generate JWT token
    const token = generateToken(user.id, user.email)

    return res.status(201).json(success({ token, user: sanitizeUser(user) }, '注册成功'))
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json(error(err.message || '注册失败'))
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json(error('邮箱和密码为必填项'))
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json(error('邮箱或密码错误'))
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json(error('邮箱或密码错误'))
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email)

    return res.json(success({ token, user: sanitizeUser(user) }, '登录成功'))
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json(error(err.message || '登录失败'))
  }
}

async function getMe(req, res) {
  try {
    const userId = req.userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return res.status(404).json(error('用户不存在'))
    }

    return res.json(success(sanitizeUser(user)))
  } catch (err) {
    console.error('GetMe error:', err)
    return res.status(500).json(error(err.message || '获取用户信息失败'))
  }
}

module.exports = { register, login, getMe }
