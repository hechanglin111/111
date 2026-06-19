import { Request, Response } from 'express'
import { prisma } from '../utils/prisma'
import { success, error } from '../utils/response'
import { planTemplates } from '../templates/planTemplates'

/**
 * 根据用户回答的问卷评分确定学习等级
 */
export function determineLevel(answers: {
  programmingBase: string
  aiKnowledge: string
  mathBase: string
  goal: string
}): string {
  let score = 0

  // programmingBase: none=0, python=1, other=2
  const programmingScore: Record<string, number> = {
    none: 0,
    python: 1,
    other: 2,
  }
  score += programmingScore[answers.programmingBase] ?? 0

  // aiKnowledge: beginner=0, concept=1, tools=2, projects=3
  const aiScore: Record<string, number> = {
    beginner: 0,
    concept: 1,
    tools: 2,
    projects: 3,
  }
  score += aiScore[answers.aiKnowledge] ?? 0

  // mathBase: high_school=0, university=1, graduate=2
  const mathScore: Record<string, number> = {
    high_school: 0,
    university: 1,
    graduate: 2,
  }
  score += mathScore[answers.mathBase] ?? 0

  // goal: trends=0, use_tools=1, develop=2, research=3
  const goalScore: Record<string, number> = {
    trends: 0,
    use_tools: 1,
    develop: 2,
    research: 3,
  }
  score += goalScore[answers.goal] ?? 0

  if (score <= 3) return 'L1'
  if (score <= 6) return 'L2'
  return 'L3'
}

/**
 * 生成学习计划
 * POST /api/plan
 */
export async function generatePlan(req: Request, res: Response) {
  try {
    const userId = req.userId!
    const { programmingBase, aiKnowledge, mathBase, goal, weeklyHours, interests } = req.body

    if (!programmingBase || !aiKnowledge || !mathBase || !goal) {
      return res.status(400).json(error('缺少必要的问卷参数'))
    }

    // 检查是否已有进行中的计划
    const existingPlan = await prisma.studyPlan.findFirst({
      where: { userId, status: 'active' },
    })

    if (existingPlan) {
      return res.status(400).json(error('已存在进行中的学习计划，请先完成或取消当前计划'))
    }

    // 根据问卷结果确定等级
    const level = determineLevel({ programmingBase, aiKnowledge, mathBase, goal })

    // 获取对应等级的模板
    const template = planTemplates[level]
    if (!template) {
      return res.status(400).json(error('无法匹配学习等级模板'))
    }

    // 计算日期
    const startDate = new Date()
    const estimatedEndDate = new Date(startDate)
    estimatedEndDate.setDate(estimatedEndDate.getDate() + template.totalWeeks * 7)

    // 创建学习计划
    const plan = await prisma.studyPlan.create({
      data: {
        userId,
        currentLevel: level,
        totalWeeks: template.totalWeeks,
        startDate,
        estimatedEndDate,
      },
    })

    // 创建学习单元和每日任务
    let currentDayNumber = 0
    let currentDate = new Date(startDate)

    for (let i = 0; i < template.units.length; i++) {
      const unitTemplate = template.units[i]
      const isFirstUnit = i === 0

      const unit = await prisma.learningUnit.create({
        data: {
          planId: plan.id,
          title: unitTemplate.title,
          description: unitTemplate.description,
          order: unitTemplate.order,
          status: isFirstUnit ? 'in_progress' : 'locked',
        },
      })

      // 创建每日任务
      for (const dayTemplate of unitTemplate.days) {
        currentDayNumber++
        const isFirstDay = isFirstUnit && dayTemplate.dayNumber === 1

        await prisma.dayTask.create({
          data: {
            unitId: unit.id,
            dayNumber: dayTemplate.dayNumber,
            date: new Date(currentDate),
            theme: dayTemplate.theme,
            videoUrl: dayTemplate.videoUrl,
            videoDuration: dayTemplate.videoDuration,
            docContent: dayTemplate.docContent,
            practiceTask: dayTemplate.practiceTask,
            estimatedMinutes: dayTemplate.estimatedMinutes,
            status: isFirstDay ? 'in_progress' : 'locked',
            completionRate: 0,
          },
        })

        // 日期递增一天
        currentDate.setDate(currentDate.getDate() + 1)
      }
    }

    // 创建学习进度记录
    const firstUnit = await prisma.learningUnit.findFirst({
      where: { planId: plan.id },
      orderBy: { order: 'asc' },
    })

    await prisma.learningProgress.create({
      data: {
        userId,
        currentUnitId: firstUnit?.id || null,
        currentDay: 1,
        totalCompletedDays: 0,
        totalSkippedDays: 0,
        streakDays: 0,
        completionRate: 0,
        videoWatchProgress: '{}',
        docReadStatus: '{}',
      },
    })

    // 更新用户的等级、目标、兴趣、每周学习时间
    await prisma.user.update({
      where: { id: userId },
      data: {
        level,
        goals: JSON.stringify([goal]),
        interests: interests ? JSON.stringify(interests) : '[]',
        weeklyHours: parseInt(weeklyHours) || 7,
      },
    })

    // 查询完整计划返回
    const fullPlan = await prisma.studyPlan.findFirst({
      where: { id: plan.id },
      include: {
        units: {
          orderBy: { order: 'asc' },
          include: {
            days: {
              orderBy: { dayNumber: 'asc' },
            },
          },
        },
      },
    })

    return res.status(201).json(success(fullPlan, '学习计划已生成'))
  } catch (err: any) {
    console.error('Generate plan error:', err)
    return res.status(500).json(error(err.message || '生成学习计划失败'))
  }
}

/**
 * 获取学习计划
 * GET /api/plan
 */
export async function getPlan(req: Request, res: Response) {
  try {
    const userId = req.userId!

    const plan = await prisma.studyPlan.findFirst({
      where: { userId, status: 'active' },
      include: {
        units: {
          orderBy: { order: 'asc' },
          include: {
            days: {
              orderBy: { dayNumber: 'asc' },
            },
          },
        },
      },
    })

    if (!plan) {
      return res.status(404).json(error('暂无进行中的学习计划'))
    }

    return res.json(success(plan))
  } catch (err: any) {
    console.error('Get plan error:', err)
    return res.status(500).json(error(err.message || '获取学习计划失败'))
  }
}

/**
 * 获取今日学习任务
 * GET /api/plan/today
 */
export async function getToday(req: Request, res: Response) {
  try {
    const userId = req.userId!

    // 获取用户的学习进度
    const progress = await prisma.learningProgress.findUnique({
      where: { userId },
    })

    if (!progress) {
      return res.status(404).json(error('暂无学习进度记录'))
    }

    // 查找当前单元
    const currentUnit = await prisma.learningUnit.findFirst({
      where: { id: progress.currentUnitId! },
      include: {
        days: {
          orderBy: { dayNumber: 'asc' },
        },
      },
    })

    if (!currentUnit) {
      return res.status(404).json(error('当前学习单元不存在'))
    }

    // 查找当前天的任务
    const dayTask = currentUnit.days.find(
      (day: any) => day.dayNumber === progress.currentDay
    )

    if (!dayTask) {
      return res.status(404).json(error('今日学习任务不存在'))
    }

    return res.json(success({ dayTask, unit: currentUnit, progress }))
  } catch (err: any) {
    console.error('Get today error:', err)
    return res.status(500).json(error(err.message || '获取今日学习任务失败'))
  }
}

/**
 * 更新学习进度
 * PUT /api/plan/progress
 */
export async function updateProgress(req: Request, res: Response) {
  try {
    const userId = req.userId!
    const { dayTaskId, status, completionRate, videoProgress, docRead } = req.body

    if (!dayTaskId || !status) {
      return res.status(400).json(error('缺少必要参数'))
    }

    // 查找任务并验证归属
    const dayTask = await prisma.dayTask.findFirst({
      where: { id: dayTaskId },
      include: {
        unit: {
          include: { plan: true },
        },
      },
    })

    if (!dayTask) {
      return res.status(404).json(error('任务不存在'))
    }

    if (dayTask.unit.plan.userId !== userId) {
      return res.status(403).json(error('无权操作此任务'))
    }

    // 更新任务状态和完成率
    await prisma.dayTask.update({
      where: { id: dayTaskId },
      data: {
        status,
        completionRate: completionRate ?? dayTask.completionRate,
      },
    })

    // 获取学习进度
    const progress = await prisma.learningProgress.findUnique({
      where: { userId },
    })

    if (!progress) {
      return res.status(404).json(error('学习进度记录不存在'))
    }

    // 构建更新数据
    const updateData: any = {}

    // 更新视频观看进度
    if (videoProgress) {
      const currentVideoProgress = JSON.parse(progress.videoWatchProgress)
      currentVideoProgress[dayTaskId] = videoProgress
      updateData.videoWatchProgress = JSON.stringify(currentVideoProgress)
    }

    // 更新文档阅读状态
    if (docRead) {
      const currentDocRead = JSON.parse(progress.docReadStatus)
      currentDocRead[dayTaskId] = docRead
      updateData.docReadStatus = JSON.stringify(currentDocRead)
    }

    // 如果任务完成，更新连续学习天数等
    if (status === 'completed') {
      updateData.totalCompletedDays = { increment: 1 }
      updateData.lastStudyDate = new Date()

      // 计算连续学习天数
      const lastStudyDate = progress.lastStudyDate
      if (lastStudyDate) {
        const diffMs = new Date().getTime() - lastStudyDate.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        if (diffDays <= 1) {
          updateData.streakDays = { increment: 1 }
        } else {
          updateData.streakDays = 1
        }
      } else {
        updateData.streakDays = 1
      }

      // 重新计算总完成率
      const plan = await prisma.studyPlan.findFirst({
        where: { userId, status: 'active' },
        include: {
          units: {
            include: { days: true },
          },
        },
      })

      if (plan) {
        const totalDays = plan.units.reduce((sum: number, u: any) => sum + u.days.length, 0)
        const completedDays = plan.units.reduce(
          (sum: number, u: any) => sum + u.days.filter((d: any) => d.status === 'completed').length,
          0
        )
        // 加上当前完成的这一天
        updateData.completionRate = (completedDays + 1) / totalDays
      }
    }

    // 更新进度
    const updatedProgress = await prisma.learningProgress.update({
      where: { userId },
      data: updateData,
    })

    // 检查当前单元是否全部完成
    const unitDays = await prisma.dayTask.findMany({
      where: { unitId: dayTask.unitId },
    })

    const allDaysCompleted = unitDays.every((d: any) => d.status === 'completed')

    if (allDaysCompleted) {
      // 标记当前单元为已完成
      await prisma.learningUnit.update({
        where: { id: dayTask.unitId },
        data: { status: 'completed' },
      })

      // 解锁下一个单元
      const currentUnit = await prisma.learningUnit.findUnique({
        where: { id: dayTask.unitId },
      })

      if (currentUnit) {
        const nextUnit = await prisma.learningUnit.findFirst({
          where: {
            planId: currentUnit.planId,
            order: { gt: currentUnit.order },
          },
          orderBy: { order: 'asc' },
        })

        if (nextUnit) {
          await prisma.learningUnit.update({
            where: { id: nextUnit.id },
            data: { status: 'in_progress' },
          })

          // 解锁下一个单元的第一天
          await prisma.dayTask.updateMany({
            where: {
              unitId: nextUnit.id,
              dayNumber: 1,
            },
            data: { status: 'in_progress' },
          })

          // 更新进度中的当前单元和天数
          await prisma.learningProgress.update({
            where: { userId },
            data: {
              currentUnitId: nextUnit.id,
              currentDay: 1,
            },
          })
        }
      }
    } else {
      // 如果当前天完成了，解锁下一天
      if (status === 'completed') {
        const nextDay = await prisma.dayTask.findFirst({
          where: {
            unitId: dayTask.unitId,
            dayNumber: { gt: dayTask.dayNumber },
            status: 'locked',
          },
          orderBy: { dayNumber: 'asc' },
        })

        if (nextDay) {
          await prisma.dayTask.update({
            where: { id: nextDay.id },
            data: { status: 'in_progress' },
          })

          await prisma.learningProgress.update({
            where: { userId },
            data: { currentDay: nextDay.dayNumber },
          })
        }
      }
    }

    return res.json(success(updatedProgress, '学习进度已更新'))
  } catch (err: any) {
    console.error('Update progress error:', err)
    return res.status(500).json(error(err.message || '更新学习进度失败'))
  }
}

/**
 * 调整学习计划
 * PUT /api/plan/adjust
 */
export async function adjustPlan(req: Request, res: Response) {
  try {
    const userId = req.userId!
    const { unitId, action } = req.body

    if (!unitId || !action) {
      return res.status(400).json(error('缺少必要参数'))
    }

    if (!['skip', 'relearn', 'add'].includes(action)) {
      return res.status(400).json(error('无效的调整操作，支持: skip, relearn, add'))
    }

    // 查找单元并验证归属
    const unit = await prisma.learningUnit.findFirst({
      where: { id: unitId },
      include: {
        plan: true,
        days: {
          orderBy: { dayNumber: 'asc' },
        },
      },
    })

    if (!unit) {
      return res.status(404).json(error('学习单元不存在'))
    }

    if (unit.plan.userId !== userId) {
      return res.status(403).json(error('无权操作此学习单元'))
    }

    if (action === 'skip') {
      // 跳过当前单元：标记为已完成，解锁下一个单元
      await prisma.learningUnit.update({
        where: { id: unitId },
        data: { status: 'completed' },
      })

      // 将所有未完成的任务标记为跳过
      await prisma.dayTask.updateMany({
        where: {
          unitId,
          status: { in: ['locked', 'in_progress'] },
        },
        data: { status: 'skipped' },
      })

      // 解锁下一个单元
      const nextUnit = await prisma.learningUnit.findFirst({
        where: {
          planId: unit.planId,
          order: { gt: unit.order },
        },
        orderBy: { order: 'asc' },
      })

      if (nextUnit) {
        await prisma.learningUnit.update({
          where: { id: nextUnit.id },
          data: { status: 'in_progress' },
        })

        // 解锁下一个单元的第一天
        await prisma.dayTask.updateMany({
          where: {
            unitId: nextUnit.id,
            dayNumber: 1,
          },
          data: { status: 'in_progress' },
        })

        // 更新进度
        await prisma.learningProgress.update({
          where: { userId },
          data: {
            currentUnitId: nextUnit.id,
            currentDay: 1,
            totalSkippedDays: { increment: 1 },
          },
        })
      }
    } else if (action === 'relearn') {
      // 重新学习：重置所有任务状态
      await prisma.dayTask.updateMany({
        where: { unitId },
        data: {
          status: 'in_progress',
          completionRate: 0,
        },
      })

      // 重置单元状态
      await prisma.learningUnit.update({
        where: { id: unitId },
        data: { status: 'in_progress' },
      })

      // 更新进度
      await prisma.learningProgress.update({
        where: { userId },
        data: {
          currentUnitId: unitId,
          currentDay: 1,
        },
      })
    }

    // 添加调整记录
    const plan = await prisma.studyPlan.findUnique({
      where: { id: unit.planId },
    })

    if (plan) {
      const adjustmentHistory = JSON.parse(plan.adjustmentHistory)
      adjustmentHistory.push({
        date: new Date().toISOString(),
        action,
        unitTitle: unit.title,
        unitId,
      })

      await prisma.studyPlan.update({
        where: { id: plan.id },
        data: {
          adjustmentHistory: JSON.stringify(adjustmentHistory),
        },
      })
    }

    // 返回更新后的计划
    const updatedPlan = await prisma.studyPlan.findFirst({
      where: { id: unit.planId },
      include: {
        units: {
          orderBy: { order: 'asc' },
          include: {
            days: {
              orderBy: { dayNumber: 'asc' },
            },
          },
        },
      },
    })

    return res.json(success(updatedPlan, '学习计划已调整'))
  } catch (err: any) {
    console.error('Adjust plan error:', err)
    return res.status(500).json(error(err.message || '调整学习计划失败'))
  }
}
