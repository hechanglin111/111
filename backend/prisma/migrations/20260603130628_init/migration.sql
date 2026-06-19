-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "level" TEXT NOT NULL DEFAULT 'L1',
    "goals" TEXT NOT NULL DEFAULT '[]',
    "interests" TEXT NOT NULL DEFAULT '[]',
    "weeklyHours" INTEGER NOT NULL DEFAULT 7,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "planSettings" TEXT NOT NULL DEFAULT '{"auto_adjust":true,"daily_reminder":true,"reminder_time":"08:00"}'
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "currentLevel" TEXT NOT NULL,
    "totalWeeks" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimatedEndDate" DATETIME NOT NULL,
    "adjustmentHistory" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StudyPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LearningUnit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    CONSTRAINT "LearningUnit_planId_fkey" FOREIGN KEY ("planId") REFERENCES "StudyPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DayTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "date" DATETIME,
    "theme" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "videoDuration" INTEGER NOT NULL,
    "docContent" TEXT NOT NULL DEFAULT '',
    "practiceTask" TEXT,
    "estimatedMinutes" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "completionRate" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "DayTask_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "LearningUnit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AINews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "publishDate" DATETIME NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "isPushed" BOOLEAN NOT NULL DEFAULT false,
    "pushDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "LearningProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "currentUnitId" TEXT,
    "currentDay" INTEGER NOT NULL DEFAULT 1,
    "totalCompletedDays" INTEGER NOT NULL DEFAULT 0,
    "totalSkippedDays" INTEGER NOT NULL DEFAULT 0,
    "streakDays" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" DATETIME,
    "completionRate" REAL NOT NULL DEFAULT 0,
    "videoWatchProgress" TEXT NOT NULL DEFAULT '{}',
    "docReadStatus" TEXT NOT NULL DEFAULT '{}',
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LearningProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NewsBookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LearningProgress_userId_key" ON "LearningProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "NewsBookmark_userId_newsId_key" ON "NewsBookmark"("userId", "newsId");
