const { prisma } = require('../utils/prisma')
const { success, error } = require('../utils/response')

async function list(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const tag = req.query.tag
    const date = req.query.date

    const skip = (page - 1) * limit

    // Build where clause
    const where = {}

    if (tag) {
      where.tags = { contains: tag }
    }

    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      where.publishDate = {
        gte: startDate,
        lt: endDate,
      }
    }

    // Fetch data with pagination
    const [list, total] = await Promise.all([
      prisma.aINews.findMany({
        where,
        orderBy: { publishDate: 'desc' },
        skip,
        take: limit,
      }),
      prisma.aINews.count({ where }),
    ])

    return res.json(success({ list, total, page, limit }))
  } catch (err) {
    console.error('News list error:', err)
    return res.status(500).json(error(err.message || '获取新闻列表失败'))
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params

    const news = await prisma.aINews.findUnique({
      where: { id },
    })

    if (!news) {
      return res.status(404).json(error('新闻不存在'))
    }

    return res.json(success(news))
  } catch (err) {
    console.error('News getById error:', err)
    return res.status(500).json(error(err.message || '获取新闻详情失败'))
  }
}

async function toggleFavorite(req, res) {
  try {
    const userId = req.userId
    const newsId = req.params.id

    // Verify news exists
    const news = await prisma.aINews.findUnique({ where: { id: newsId } })
    if (!news) {
      return res.status(404).json(error('新闻不存在'))
    }

    // Check if bookmark already exists
    const existing = await prisma.newsBookmark.findUnique({
      where: {
        userId_newsId: { userId, newsId },
      },
    })

    if (existing) {
      // Remove bookmark
      await prisma.newsBookmark.delete({
        where: {
          userId_newsId: { userId, newsId },
        },
      })
      return res.json(success({ isBookmarked: false }, '已取消收藏'))
    } else {
      // Create bookmark
      await prisma.newsBookmark.create({
        data: { userId, newsId },
      })
      return res.json(success({ isBookmarked: true }, '已收藏'))
    }
  } catch (err) {
    console.error('Toggle favorite error:', err)
    return res.status(500).json(error(err.message || '操作收藏失败'))
  }
}

module.exports = { list, getById, toggleFavorite }
