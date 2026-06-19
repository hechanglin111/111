const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('开始数据库初始化...')

  // 1. 创建测试用户
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash('123456', salt)

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash,
      name: '测试用户',
      level: 'L1',
      goals: JSON.stringify(['develop']),
      interests: JSON.stringify(['机器学习', '深度学习', 'LLM']),
      weeklyHours: 7,
    },
  })

  console.log(`测试用户已创建: ${user.email}`)

  // 2. 创建 10 条 AI 新闻
  const newsData = [
    {
      id: 'news-001',
      title: 'OpenAI 发布 GPT-5：推理能力实现质的飞跃，支持百万级上下文窗口',
      summary: 'OpenAI 正式发布新一代大语言模型 GPT-5，在数学推理、代码生成和多步复杂任务上表现大幅提升。新模型支持高达 100 万 token 的上下文窗口，并引入了全新的"深度思考"模式。',
      sourceUrl: 'https://openai.com/blog/gpt-5',
      sourceName: 'OpenAI Blog',
      publishDate: new Date('2026-06-01'),
      tags: JSON.stringify(['LLM', 'OpenAI']),
      isPushed: true,
      pushDate: new Date('2026-06-01'),
    },
    {
      id: 'news-002',
      title: 'Google DeepMind 推出 Gemini 2.0 Ultra：原生多模态架构重新定义 AI 助手',
      summary: 'Google DeepMind 发布了 Gemini 2.0 Ultra，采用全新的原生多模态架构，能够无缝处理文本、图像、音频和视频的混合输入输出。',
      sourceUrl: 'https://blog.google/technology/ai/gemini-2-ultra/',
      sourceName: 'Google Blog',
      publishDate: new Date('2026-06-02'),
      tags: JSON.stringify(['多模态', 'Google', 'LLM']),
      isPushed: true,
      pushDate: new Date('2026-06-02'),
    },
    {
      id: 'news-003',
      title: 'Meta 开源 Llama 4 Scout：4050 亿参数开源模型首次超越闭源竞品',
      summary: 'Meta 宣布开源 Llama 4 Scout，这是目前最大的开源大语言模型，拥有 4050 亿参数。在多个权威基准测试中首次全面超越同级别闭源模型。',
      sourceUrl: 'https://ai.meta.com/blog/llama-4/',
      sourceName: 'Meta AI Blog',
      publishDate: new Date('2026-06-03'),
      tags: JSON.stringify(['LLM', 'Meta', 'Agent']),
      isPushed: true,
      pushDate: new Date('2026-06-03'),
    },
    {
      id: 'news-004',
      title: 'AI Agent 生态爆发：AutoGen 2.0 支持多 Agent 实时协作，企业级应用加速落地',
      summary: '微软发布了 AutoGen 2.0 框架的重大更新，引入了多 Agent 实时协作、动态任务分配和持久化记忆等企业级特性。',
      sourceUrl: 'https://microsoft.github.io/autogen/blog/2026/06/autogen-2',
      sourceName: 'Microsoft Research Blog',
      publishDate: new Date('2026-06-03'),
      tags: JSON.stringify(['Agent', 'LLM']),
      isPushed: false,
    },
    {
      id: 'news-005',
      title: '计算机视觉新突破：Meta Segment Anything Model 3 实现零样本 3D 场景理解',
      summary: 'Meta 的 FAIR 团队发布了 SAM 3，首次将分割能力从 2D 图像扩展到完整的 3D 场景，支持从单张图片或视频流重建 3D 分割结果。',
      sourceUrl: 'https://ai.meta.com/blog/sam3/',
      sourceName: 'Meta AI Blog',
      publishDate: new Date('2026-06-04'),
      tags: JSON.stringify(['计算机视觉', 'Meta']),
      isPushed: false,
    },
    {
      id: 'news-006',
      title: '数据科学新范式：Google 发布 Data AI Assistant，自然语言驱动的端到端数据分析',
      summary: 'Google 发布了 Data AI Assistant，用户只需用自然语言描述分析需求，系统即可自动完成数据清洗、探索性分析、建模和可视化全流程。',
      sourceUrl: 'https://cloud.google.com/blog/products/data-analytics/data-ai-assistant',
      sourceName: 'Google Cloud Blog',
      publishDate: new Date('2026-06-05'),
      tags: JSON.stringify(['数据科学', 'Google', 'Agent']),
      isPushed: false,
    },
    {
      id: 'news-007',
      title: 'Anthropic Claude 4 发布：200 万 token 上下文窗口，代码能力媲美高级工程师',
      summary: 'Anthropic 正式发布 Claude 4，支持 200 万 token 的超长上下文窗口。在 SWE-bench 基准测试中代码修复准确率达到 78%。',
      sourceUrl: 'https://www.anthropic.com/news/claude-4',
      sourceName: 'Anthropic Blog',
      publishDate: new Date('2026-06-06'),
      tags: JSON.stringify(['LLM', 'Agent']),
      isPushed: false,
    },
    {
      id: 'news-008',
      title: '多模态 Agent 新时代：OpenAI 推出 Operator 2.0，AI 可自主操作电脑完成复杂任务',
      summary: 'OpenAI 发布了 Operator 2.0，能够自主操作电脑界面，完成包括网页浏览、文件管理、软件操作等复杂任务。',
      sourceUrl: 'https://openai.com/blog/operator-2',
      sourceName: 'OpenAI Blog',
      publishDate: new Date('2026-06-07'),
      tags: JSON.stringify(['Agent', '多模态', 'OpenAI']),
      isPushed: false,
    },
    {
      id: 'news-009',
      title: 'AI 编程助手市场格局巨变：Cursor 3.0 发布，支持全仓库级别的代码理解和重构',
      summary: 'Cursor 发布了 3.0 版本，引入了全仓库级别的代码理解和重构能力，能够理解整个项目的架构和依赖关系。',
      sourceUrl: 'https://cursor.sh/blog/v3',
      sourceName: 'Cursor Blog',
      publishDate: new Date('2026-06-08'),
      tags: JSON.stringify(['编程工具', 'Agent']),
      isPushed: false,
    },
    {
      id: 'news-010',
      title: 'AI 安全新标准：ISO/IEC 42001:2026 发布，全球首个 AI 管理体系国际标准正式实施',
      summary: '国际标准化组织正式发布了 ISO/IEC 42001:2026，为组织提供了建立、实施、维护和持续改进 AI 管理体系的框架。',
      sourceUrl: 'https://www.iso.org/standard/ai-management-42001',
      sourceName: 'ISO News',
      publishDate: new Date('2026-06-09'),
      tags: JSON.stringify(['AI安全', '政策法规']),
      isPushed: false,
    },
  ]

  for (const news of newsData) {
    await prisma.aINews.upsert({
      where: { id: news.id },
      update: {},
      create: news,
    })
  }

  console.log('AI 新闻已创建: 10 条')

  // 3. 创建学习计划
  const startDate = new Date()
  const estimatedEndDate = new Date(startDate)
  estimatedEndDate.setDate(estimatedEndDate.getDate() + 12 * 7)

  const plan = await prisma.studyPlan.create({
    data: {
      userId: user.id,
      status: 'active',
      currentLevel: 'L1',
      totalWeeks: 12,
      startDate,
      estimatedEndDate,
    },
  })

  console.log(`学习计划已创建: ${plan.id}`)

  // 4. 创建学习单元和每日任务
  const unitsData = [
    {
      title: 'Python 基础与 AI 工具入门',
      description: '从零开始学习 Python 编程，掌握 AI 开发必备的基础工具和环境配置。',
      order: 1,
      status: 'in_progress',
      days: [
        { dayNumber: 1, theme: 'Python 环境搭建与第一个程序', videoUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc', videoDuration: 25, docContent: '# Python 环境搭建与第一个程序\n\n## 为什么选择 Python？\n\nPython 是目前 AI 和机器学习领域最流行的编程语言。它语法简洁、易于学习，并且拥有丰富的第三方库生态。\n\n## 安装 Python\n\n1. 前往 python.org 下载最新版本\n2. 安装时勾选 "Add Python to PATH"\n3. 打开终端验证：python --version\n\n## 第一个程序\n\n```python\nprint("Hello, AI World!")\nname = "AI学习者"\nprint(f"你好, {name}!")\n```\n\n## 小结\n\n今天我们完成了 Python 环境搭建，编写了第一个程序。', practiceTask: '安装 Python 和 VS Code，编写一个程序输出你的名字和学习目标。', estimatedMinutes: 45, status: 'in_progress' },
        { dayNumber: 2, theme: 'Python 变量、数据类型与运算符', videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw', videoDuration: 28, docContent: '# Python 变量、数据类型与运算符\n\n## 基本数据类型\n\n```python\na = 10\npi = 3.14159\ngreeting = "你好"\nscores = [85, 90, 78, 92]\nis_active = True\n```\n\n## 运算符\n\n```python\nx = 10\ny = 3\nprint(x + y)   # 13\nprint(x // y)  # 3 整除\nprint(x ** y)  # 1000 幂运算\n```', practiceTask: '编写一个温度转换程序：输入摄氏温度，输出华氏温度。', estimatedMinutes: 45, status: 'locked' },
        { dayNumber: 3, theme: 'Python 函数与控制流', videoUrl: 'https://www.youtube.com/watch?v=ra9ZJm3G3e8', videoDuration: 30, docContent: '# Python 函数与控制流\n\n## 条件语句\n\n```python\nscore = 85\nif score >= 90:\n    print("优秀")\nelif score >= 80:\n    print("良好")\nelse:\n    print("及格")\n```\n\n## 函数定义\n\n```python\ndef greet(name):\n    return f"你好, {name}!"\n\nprint(greet("AI学习者"))\n```', practiceTask: '编写一个函数，接收一个数字列表，返回最大值和最小值。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 4, theme: 'NumPy 数组基础', videoUrl: 'https://www.youtube.com/watch?v=QUT1VHiLmmk', videoDuration: 22, docContent: '# NumPy 数组基础\n\n## 创建数组\n\n```python\nimport numpy as np\narr = np.array([1, 2, 3, 4, 5])\nzeros = np.zeros((3, 4))\nrandom_arr = np.random.rand(3, 3)\n```\n\n## 数组运算\n\n```python\na = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\nprint(a + b)    # [5 7 9]\nprint(a * b)    # [4 10 18]\nprint(a.mean()) # 2.0\n```', practiceTask: '使用 NumPy 创建一个 5x5 随机矩阵，计算每行的平均值。', estimatedMinutes: 45, status: 'locked' },
        { dayNumber: 5, theme: 'Pandas 数据处理基础', videoUrl: 'https://www.youtube.com/watch?v=vmEHCJvmsLo', videoDuration: 30, docContent: '# Pandas 数据处理基础\n\n## 创建 DataFrame\n\n```python\nimport pandas as pd\ndata = {\n    "姓名": ["张三", "李四", "王五"],\n    "年龄": [25, 30, 28],\n    "成绩": [85, 92, 78]\n}\ndf = pd.DataFrame(data)\n```\n\n## 数据筛选\n\n```python\ngood = df[df["成绩"] >= 85]\nsorted_df = df.sort_values("成绩", ascending=False)\n```', practiceTask: '创建一个包含 10 名学生信息的 DataFrame，计算平均分并排序。', estimatedMinutes: 50, status: 'locked' },
      ],
    },
    {
      title: '机器学习基础概念',
      description: '了解机器学习的核心概念，包括监督学习、无监督学习和模型评估方法。',
      order: 2,
      status: 'locked',
      days: [
        { dayNumber: 1, theme: '什么是机器学习？', videoUrl: 'https://www.youtube.com/watch?v=ukzFI9rgwfU', videoDuration: 20, docContent: '# 什么是机器学习？\n\n## 定义\n\n机器学习让计算机从数据中自动学习规律，而无需显式编程。\n\n## 三大类别\n\n1. **监督学习**: 有标签数据，如垃圾邮件分类\n2. **无监督学习**: 无标签数据，如客户分群\n3. **强化学习**: 通过交互学习，如游戏 AI\n\n## 简单示例\n\n```python\nfrom sklearn.linear_model import LinearRegression\nX = [[50], [80], [120], [150], [200]]\ny = [150, 230, 340, 420, 560]\nmodel = LinearRegression()\nmodel.fit(X, y)\nprint(model.predict([[100]]))\n```', practiceTask: '用自己的话描述监督学习和无监督学习的区别。', estimatedMinutes: 40, status: 'locked' },
        { dayNumber: 2, theme: '监督学习详解', videoUrl: 'https://www.youtube.com/watch?v=1FZ0A1QCMWc', videoDuration: 25, docContent: '# 监督学习详解\n\n## 回归 vs 分类\n\n- **回归**: 预测连续值（房价预测）\n- **分类**: 预测离散类别（垃圾邮件识别）\n\n## 决策树示例\n\n```python\nfrom sklearn.datasets import load_iris\nfrom sklearn.tree import DecisionTreeClassifier\niris = load_iris()\nmodel = DecisionTreeClassifier()\nmodel.fit(iris.data, iris.target)\nprint(model.score(iris.data, iris.target))\n```', practiceTask: '使用决策树对鸢尾花数据集进行分类。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 3, theme: '无监督学习详解', videoUrl: 'https://www.youtube.com/watch?v=0Aen8mj2fQY', videoDuration: 22, docContent: '# 无监督学习详解\n\n## K-Means 聚类\n\n```python\nfrom sklearn.cluster import KMeans\nimport numpy as np\nX = np.array([[1,2],[1.5,1.8],[5,8],[8,8],[1,0.6],[9,11]])\nkmeans = KMeans(n_clusters=3, random_state=42, n_init=10)\nkmeans.fit(X)\nprint(kmeans.labels_)\n```\n\n## 工作原理\n\n1. 随机初始化 K 个中心\n2. 分配数据点到最近中心\n3. 重新计算中心\n4. 重复直到收敛', practiceTask: '生成二维随机数据，使用 K-Means 聚类并可视化结果。', estimatedMinutes: 45, status: 'locked' },
        { dayNumber: 4, theme: '模型评估方法', videoUrl: 'https://www.youtube.com/watch?v=85ltlRm4V8Y', videoDuration: 25, docContent: '# 模型评估方法\n\n## 分类评估指标\n\n- **准确率**: 预测正确的比例\n- **精确率**: 预测为正中实际为正\n- **召回率**: 实际为正中预测为正\n- **F1 分数**: 精确率和召回率的调和平均\n\n## 交叉验证\n\n```python\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"准确率: {scores.mean():.2%}")\n```', practiceTask: '使用不同模型对同一数据集分类，比较评估指标。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 5, theme: '第一个机器学习项目：手写数字识别', videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk', videoDuration: 30, docContent: '# 手写数字识别项目\n\n```python\nfrom sklearn.datasets import load_digits\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\n\ndigits = load_digits()\nX_train, X_test, y_train, y_test = train_test_split(\n    digits.data, digits.target, test_size=0.2\n)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\nprint(f"准确率: {model.score(X_test, y_test):.2%}")\n```', practiceTask: '完成手写数字识别项目，尝试使用 SVM 分类器比较效果。', estimatedMinutes: 60, status: 'locked' },
      ],
    },
    {
      title: '深度学习入门',
      description: '学习神经网络的基本原理，了解 CNN、RNN 等常见深度学习架构。',
      order: 3,
      status: 'locked',
      days: [
        { dayNumber: 1, theme: '神经网络基础', videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk', videoDuration: 20, docContent: '# 神经网络基础\n\n## 神经元模型\n\n输入 → 加权求和 → 激活函数 → 输出\n\n## 激活函数\n\n```python\nimport numpy as np\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\ndef relu(x):\n    return np.maximum(0, x)\n```\n\n## 前向传播\n\n```python\ndef forward(X, W1, b1, W2, b2):\n    hidden = np.maximum(0, X.dot(W1) + b1)\n    output = hidden.dot(W2) + b2\n    return output\n```', practiceTask: '用 NumPy 实现一个两层神经网络，对 AND 逻辑门分类。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 2, theme: '卷积神经网络 (CNN)', videoUrl: 'https://www.youtube.com/watch?v=2-Ol7ZB0MmU', videoDuration: 25, docContent: '# 卷积神经网络 (CNN)\n\n## CNN 核心组件\n\n- **卷积层**: 提取局部特征\n- **池化层**: 降低维度\n- **全连接层**: 输出分类\n\n## Keras 构建 CNN\n\n```python\nfrom tensorflow.keras import layers, models\nmodel = models.Sequential([\n    layers.Conv2D(32, (3,3), activation=\'relu\', input_shape=(28,28,1)),\n    layers.MaxPooling2D((2,2)),\n    layers.Flatten(),\n    layers.Dense(64, activation=\'relu\'),\n    layers.Dense(10, activation=\'softmax\')\n])\n```', practiceTask: '使用 Keras 构建 CNN，在 MNIST 上训练并评估。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 3, theme: '循环神经网络 (RNN)', videoUrl: 'https://www.youtube.com/watch?v=WCUNPn-3_Dg', videoDuration: 22, docContent: '# 循环神经网络 (RNN)\n\n## LSTM\n\nLSTM 解决了梯度消失问题。\n\n```python\nfrom tensorflow.keras.layers import LSTM, Dense, Embedding\nfrom tensorflow.keras.models import Sequential\n\nmodel = Sequential([\n    Embedding(10000, 128),\n    LSTM(64),\n    Dense(16, activation=\'relu\'),\n    Dense(1, activation=\'sigmoid\')\n])\n```\n\n## 应用场景\n\n- 自然语言处理\n- 语音识别\n- 时间序列预测', practiceTask: '使用 LSTM 构建一个简单的情感分析模型。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 4, theme: '模型训练技巧', videoUrl: 'https://www.youtube.com/watch?v=_T7lS3nIrD4', videoDuration: 25, docContent: '# 模型训练技巧\n\n## 优化器\n\n```python\n# Adam（最常用）\nopt = Adam(learning_rate=0.001)\n```\n\n## 正则化\n\n```python\nfrom tensorflow.keras.layers import Dropout\nmodel = Sequential([\n    Dense(128, activation=\'relu\'),\n    Dropout(0.5),\n    Dense(10, activation=\'softmax\')\n])\n```', practiceTask: '训练模型时使用 EarlyStopping 和学习率调度。', estimatedMinutes: 45, status: 'locked' },
        { dayNumber: 5, theme: '第一个深度学习项目：图像分类', videoUrl: 'https://www.youtube.com/watch?v=V-FZn1fMVqo', videoDuration: 30, docContent: '# 图像分类项目\n\n```python\nfrom tensorflow.keras import layers, models, datasets\n(x_train, y_train), (x_test, y_test) = datasets.cifar10.load_data()\nx_train = x_train.astype(\'float32\') / 255.0\n\nmodel = models.Sequential([\n    layers.Conv2D(32, (3,3), activation=\'relu\', input_shape=(32,32,3)),\n    layers.MaxPooling2D((2,2)),\n    layers.Conv2D(64, (3,3), activation=\'relu\'),\n    layers.MaxPooling2D((2,2)),\n    layers.Flatten(),\n    layers.Dense(64, activation=\'relu\'),\n    layers.Dense(10, activation=\'softmax\')\n])\nmodel.compile(optimizer=\'adam\', loss=\'sparse_categorical_crossentropy\')\nmodel.fit(x_train, y_train, epochs=10, validation_split=0.2)\n```', practiceTask: '完成 CIFAR-10 分类，尝试增加卷积层提升准确率。', estimatedMinutes: 60, status: 'locked' },
      ],
    },
    {
      title: '大语言模型与 AI 应用',
      description: '了解大语言模型的基本原理，学习 Prompt 工程和 AI API 的使用方法。',
      order: 4,
      status: 'locked',
      days: [
        { dayNumber: 1, theme: '什么是大语言模型？', videoUrl: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', videoDuration: 20, docContent: '# 什么是大语言模型？\n\n## 定义\n\n大语言模型（LLM）是基于 Transformer 架构、在海量文本上训练的大型 AI 模型。\n\n## 发展历程\n\n- GPT-1 (2018): 首个大规模预训练模型\n- GPT-3 (2020): 1750亿参数\n- ChatGPT (2022): 对话式 AI 爆火\n- GPT-4o (2024): 实时多模态\n\n## 核心能力\n\n1. 文本生成 2. 问答系统 3. 文本摘要 4. 翻译 5. 推理', practiceTask: '阅读 Transformer 论文摘要，总结 Self-Attention 的作用。', estimatedMinutes: 40, status: 'locked' },
        { dayNumber: 2, theme: 'Prompt 工程基础', videoUrl: 'https://www.youtube.com/watch?v=jV4D06KNdBE', videoDuration: 22, docContent: '# Prompt 工程基础\n\n## 基本 Prompt 技巧\n\n### 明确指令\n\n差: "写个文章"\n好: "请写一篇关于AI的500字科普文章"\n\n### 角色设定\n\n"你是一位有10年经验的Python数据科学家"\n\n### 分步思考\n\n"请一步一步地思考以下问题..."\n\n### 输出格式控制\n\n"请以 JSON 格式输出..."', practiceTask: '设计 5 个不同场景的 Prompt，使用不同技巧。', estimatedMinutes: 40, status: 'locked' },
        { dayNumber: 3, theme: 'AI API 使用入门', videoUrl: 'https://www.youtube.com/watch?v=jlogLBkPZ2A', videoDuration: 25, docContent: '# AI API 使用入门\n\n## OpenAI API\n\n```python\nimport openai\nopenai.api_key = "your-api-key"\nresponse = openai.chat.completions.create(\n    model="gpt-4o-mini",\n    messages=[\n        {"role": "system", "content": "你是一个AI助手"},\n        {"role": "user", "content": "用Python写快速排序"}\n    ]\n)\nprint(response.choices[0].message.content)\n```\n\n## 免费替代方案\n\n- Ollama: 本地运行\n- Hugging Face: 免费额度\n- Groq: 免费快速推理', practiceTask: '注册 AI API 账号，编写一个多轮对话程序。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 4, theme: 'RAG（检索增强生成）基础', videoUrl: 'https://www.youtube.com/watch?v=6nSjG8mGmWY', videoDuration: 25, docContent: '# RAG（检索增强生成）基础\n\n## RAG 工作流程\n\n用户提问 → 文档检索 → 上下文拼接 → LLM生成 → 返回答案\n\n## 文档向量化\n\n```python\nfrom sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer(\'all-MiniLM-L6-v2\')\ndocs = ["Python是解释型语言", "机器学习是AI的分支"]\nembeddings = model.encode(docs)\n```\n\n## RAG 优势\n\n- 减少幻觉\n- 知识可更新\n- 可追溯来源', practiceTask: '使用 sentence-transformers 实现简单文档问答。', estimatedMinutes: 50, status: 'locked' },
        { dayNumber: 5, theme: 'AI 伦理与未来展望', videoUrl: 'https://www.youtube.com/watch?v=JLU7WqM-ROc', videoDuration: 20, docContent: '# AI 伦理与未来展望\n\n## 核心议题\n\n1. **偏见与公平性**: AI 可能继承数据中的偏见\n2. **隐私保护**: 数据收集的知情同意\n3. **透明性**: 黑盒模型的决策过程\n4. **安全性**: 对抗攻击和深度伪造\n\n## 未来趋势\n\n- 多模态 AI\n- AI Agent\n- 边缘 AI\n- AI for Science', practiceTask: '选择一个 AI 伦理案例，分析利益冲突并给出建议。', estimatedMinutes: 40, status: 'locked' },
      ],
    },
  ]

  let firstUnitId = null

  for (const unitData of unitsData) {
    const unit = await prisma.learningUnit.create({
      data: {
        planId: plan.id,
        title: unitData.title,
        description: unitData.description,
        order: unitData.order,
        status: unitData.status,
      },
    })

    if (unitData.order === 1) {
      firstUnitId = unit.id
    }

    for (const dayData of unitData.days) {
      const dayOffset = (unitData.order - 1) * 5 + (dayData.dayNumber - 1)
      await prisma.dayTask.create({
        data: {
          unitId: unit.id,
          dayNumber: dayData.dayNumber,
          date: new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000),
          theme: dayData.theme,
          videoUrl: dayData.videoUrl,
          videoDuration: dayData.videoDuration,
          docContent: dayData.docContent,
          practiceTask: dayData.practiceTask,
          estimatedMinutes: dayData.estimatedMinutes,
          status: dayData.status,
          completionRate: 0,
        },
      })
    }

    console.log(`单元已创建: ${unitData.title} (${unitData.days.length} 天)`)
  }

  // 5. 创建学习进度
  const progress = await prisma.learningProgress.create({
    data: {
      userId: user.id,
      currentUnitId: firstUnitId,
      currentDay: 1,
      totalCompletedDays: 0,
      totalSkippedDays: 0,
      streakDays: 0,
      completionRate: 0,
      videoWatchProgress: '{}',
      docReadStatus: '{}',
    },
  })

  console.log(`学习进度已创建: ${progress.id}`)
  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
