import type { StudyPlan } from '../types'

export const mockStudyPlan: StudyPlan = {
  id: 'plan_001',
  user_id: 'user_001',
  status: 'active',
  current_level: 'L1',
  total_weeks: 12,
  start_date: '2026-06-01',
  estimated_end_date: '2026-08-24',
  adjustment_history: [],
  units: [
    {
      unit_id: 'unit_01',
      title: 'AI 基础入门：理解人工智能的核心概念',
      description: '从零开始了解人工智能的基本概念、发展历史和主要应用领域，建立对 AI 的全局认知。',
      order: 1,
      status: 'in_progress',
      days: [
        {
          day_number: 1,
          date: '2026-06-01',
          theme: '什么是人工智能？',
          video_url: 'https://www.youtube.com/watch?v=JMUxmLyrhSk',
          video_duration: 1200,
          doc_content: `# 什么是人工智能？

## 概述

人工智能（Artificial Intelligence，简称 AI）是计算机科学的一个分支，致力于创建能够模拟人类智能行为的系统。这些系统能够学习、推理、感知、理解自然语言，并做出决策。

## AI 的三个层次

### 1. 弱人工智能（Narrow AI / ANI）
弱人工智能是专门为某一特定任务设计的 AI 系统。目前我们使用的绝大多数 AI 都属于这一类。

**示例：**
- Siri / 小爱同学等语音助手
- 推荐算法（抖音、淘宝）
- AlphaGo（围棋 AI）
- ChatGPT（大语言模型）

### 2. 强人工智能（General AI / AGI）
强人工智能是指具有与人类同等智能水平的 AI，能够理解、学习并应用知识到任何智力任务中。

> 目前 AGI 尚未实现，它是 AI 研究的终极目标之一。

### 3. 超级人工智能（Super AI / ASI）
超级人工智能是指在所有领域都超越人类最聪明大脑的 AI。这目前仍属于理论概念。

## AI 的发展简史

| 年代 | 里程碑事件 |
|------|-----------|
| 1950 | 图灵提出"图灵测试" |
| 1956 | 达特茅斯会议，AI 正式诞生 |
| 1997 | 深蓝击败国际象棋冠军卡斯帕罗夫 |
| 2012 | AlexNet 在 ImageNet 竞赛中取得突破 |
| 2016 | AlphaGo 击败围棋世界冠军李世石 |
| 2022 | ChatGPT 发布，掀起大语言模型热潮 |
| 2024-2026 | 多模态 AI、AI Agent 快速发展 |

## AI 的主要应用领域

\`\`\`python
# AI 应用领域分类
ai_applications = {
    "自然语言处理": ["机器翻译", "文本摘要", "情感分析", "对话系统"],
    "计算机视觉": ["图像分类", "目标检测", "人脸识别", "自动驾驶"],
    "语音技术": ["语音识别", "语音合成", "声纹识别"],
    "推荐系统": ["电商推荐", "内容推荐", "广告投放"],
    "医疗健康": ["医学影像诊断", "药物研发", "健康管理"],
    "金融科技": ["风险评估", "量化交易", "反欺诈检测"],
}

for domain, apps in ai_applications.items():
    print(f"【{domain}】: {', '.join(apps)}")
\`\`\`

## 关键要点

1. **AI 不等于机器人**：AI 是软件层面的智能，机器人是物理载体
2. **当前 AI 是数据驱动的**：大量高质量数据是 AI 成功的关键
3. **AI 有局限性**：AI 会犯错、存在偏见、缺乏真正的理解能力
4. **AI 是工具而非替代品**：AI 的价值在于增强人类能力

## 思考题

- 你日常生活中使用了哪些 AI 产品？它们分别属于哪个应用领域？
- 你认为 AI 最大的机遇和挑战分别是什么？
`,
          practice_task: '列出你日常生活中使用的 5 个 AI 产品，分析它们分别属于 AI 的哪个应用领域，并思考它们是如何改善你的生活的。',
          estimated_minutes: 30,
          status: 'completed',
          completion_rate: 100,
        },
        {
          day_number: 2,
          date: '2026-06-02',
          theme: '机器学习基础：从数据中学习',
          video_url: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
          video_duration: 1800,
          doc_content: `# 机器学习基础：从数据中学习

## 什么是机器学习？

机器学习（Machine Learning，ML）是 AI 的一个子领域，其核心思想是让计算机从**数据**中自动学习规律和模式，而无需被显式编程。

### 传统编程 vs 机器学习

\`\`\`
传统编程：  数据 + 规则 → 程序 → 答案
机器学习：  数据 + 答案 → 算法 → 规则
\`\`\`

## 机器学习的三大类型

### 1. 监督学习（Supervised Learning）

使用**有标签**的数据进行训练，学习输入到输出的映射关系。

**常见任务：**
- 分类（Classification）：判断邮件是否为垃圾邮件
- 回归（Regression）：预测房价

\`\`\`python
# 监督学习示例：简单的线性回归
from sklearn.linear_model import LinearRegression

# 训练数据：房屋面积 (平方米) 和价格 (万元)
X = [[50], [80], [100], [120], [150], [180], [200]]
y = [250, 380, 480, 560, 700, 850, 950]

# 创建并训练模型
model = LinearRegression()
model.fit(X, y)

# 预测 130 平方米的房屋价格
predicted_price = model.predict([[130]])
print(f"预测价格: {predicted_price[0]:.1f} 万元")
# 输出: 预测价格: 610.7 万元
\`\`\`

### 2. 无监督学习（Unsupervised Learning）

使用**无标签**的数据，让算法自行发现数据中的结构和模式。

**常见任务：**
- 聚类（Clustering）：将用户分组
- 降维（Dimensionality Reduction）：数据可视化

\`\`\`python
# 无监督学习示例：K-Means 聚类
from sklearn.cluster import KMeans
import numpy as np

# 用户行为数据（每天使用手机时长, 每月消费金额）
X = np.array([
    [2, 100], [3, 150], [2.5, 120],   # 低使用、低消费
    [8, 500], [7, 600], [9, 550],     # 高使用、高消费
    [1, 800], [2, 900], [1.5, 850],   # 低使用、高消费
])

# 聚成 3 组
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(X)

print("聚类标签:", kmeans.labels_)
# 输出: 聚类标签: [1 1 1 0 0 0 2 2 2]
\`\`\`

### 3. 强化学习（Reinforcement Learning）

智能体通过与环境交互，根据**奖励/惩罚**信号来学习最优策略。

**经典案例：**
- AlphaGo 学习下围棋
- 机器人学走路
- 游戏AI（如 Dota 2、StarCraft）

\`\`\`python
# 强化学习的核心循环
class RLAgent:
    def __init__(self):
        self.state = None
        self.action = None
        self.reward = None

    def interact_with_environment(self):
        while not self.is_done():
            # 1. 观察当前状态
            self.state = self.observe()

            # 2. 根据策略选择动作
            self.action = self.select_action(self.state)

            # 3. 执行动作，获得奖励
            self.reward = self.execute(self.action)

            # 4. 更新策略（学习）
            self.update_policy(
                self.state, self.action, self.reward
            )
\`\`\`

## 机器学习工作流程

\`\`\`
1. 收集数据 → 2. 数据预处理 → 3. 特征工程
       ↓
4. 选择模型 → 5. 训练模型 → 6. 评估模型
       ↓
7. 优化调参 → 8. 部署上线 → 9. 持续监控
\`\`\`

## 关键概念

| 概念 | 解释 |
|------|------|
| 特征（Feature） | 数据中用于学习的属性，如房屋的面积、位置 |
| 标签（Label） | 我们想预测的目标值，如房屋价格 |
| 训练集（Training Set） | 用于训练模型的数据 |
| 测试集（Test Set） | 用于评估模型性能的数据 |
| 过拟合（Overfitting） | 模型在训练数据上表现好，但在新数据上表现差 |
| 欠拟合（Underfitting） | 模型过于简单，无法捕捉数据中的规律 |

## 思考题

- 以下场景分别适合用哪种机器学习方法？
  - 根据用户浏览历史推荐商品
  - 将新闻文章按主题分类
  - 训练 AI 玩超级玛丽
`,
          practice_task: '使用 Python 和 scikit-learn 实现一个简单的分类模型：用鸢尾花（Iris）数据集训练一个决策树分类器，并输出模型准确率。提示：from sklearn.datasets import load_iris',
          estimated_minutes: 45,
          status: 'completed',
          completion_rate: 100,
        },
        {
          day_number: 3,
          date: '2026-06-03',
          theme: '深度学习与神经网络：大脑的数字模拟',
          video_url: 'https://www.youtube.com/watch?v=aircAruvnKk',
          video_duration: 1200,
          doc_content: `# 深度学习与神经网络：大脑的数字模拟

## 什么是深度学习？

深度学习（Deep Learning）是机器学习的一个子集，使用**多层神经网络**来学习数据的复杂表示。它是当前 AI 领域最热门的技术方向。

### AI、ML、DL 的关系

\`\`\`
人工智能 (AI)
  └── 机器学习 (ML)
        └── 深度学习 (DL)
              └── 大语言模型 (LLM)
\`\`\`

## 人工神经元：从生物到数字

### 生物神经元
- **树突（Dendrites）**：接收信号
- **细胞体（Cell Body）**：处理信号
- **轴突（Axon）**：输出信号
- **突触（Synapse）**：连接其他神经元

### 人工神经元（感知器）

\`\`\`python
import numpy as np

def artificial_neuron(inputs, weights, bias):
    """
    人工神经元的前向传播
    inputs: 输入值列表
    weights: 权重列表
    bias: 偏置值
    """
    # 加权求和
    weighted_sum = np.dot(inputs, weights) + bias

    # 激活函数（阶跃函数）
    output = 1 if weighted_sum > 0 else 0

    return output

# 示例：判断是否需要带伞
# 输入: [天阴(1/0), 湿度高(1/0), 气象预报有雨(1/0)]
inputs = [1, 1, 1]
weights = [0.3, 0.2, 0.5]
bias = -0.4

result = artificial_neuron(inputs, weights, bias)
print(f"是否带伞: {'是' if result == 1 else '否'}")
# 输出: 是否带伞: 是
\`\`\`

## 神经网络的结构

\`\`\`
输入层        隐藏层        输出层
(x1) ──→ (h1) ──→ (y1)
(x2) ──→ (h2) ──→ (y2)
(x3) ──→ (h3) ──→ (y3)
\`\`\`

### 常见激活函数

\`\`\`python
import numpy as np

def sigmoid(x):
    """Sigmoid 函数：输出 (0, 1)"""
    return 1 / (1 + np.exp(-x))

def relu(x):
    """ReLU 函数：最常用的激活函数"""
    return max(0, x)

def softmax(x):
    """Softmax 函数：输出概率分布"""
    exp_x = np.exp(x - np.max(x))
    return exp_x / exp_x.sum()

# 示例
print(f"sigmoid(0) = {sigmoid(0)}")      # 0.5
print(f"sigmoid(5) = {sigmoid(5):.4f}")  # 0.9933
print(f"relu(-3) = {relu(-3)}")          # 0
print(f"relu(5) = {relu(5)}")            # 5
\`\`\`

## 用 PyTorch 构建第一个神经网络

\`\`\`python
import torch
import torch.nn as nn

# 定义一个简单的神经网络
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        # 定义网络层
        self.layer1 = nn.Linear(784, 128)  # 输入层 → 隐藏层
        self.layer2 = nn.Linear(128, 64)   # 隐藏层 → 隐藏层
        self.layer3 = nn.Linear(64, 10)    # 隐藏层 → 输出层
        self.relu = nn.ReLU()              # 激活函数

    def forward(self, x):
        # 前向传播
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.layer3(x)
        return x

# 创建模型
model = SimpleNet()
print(model)

# 查看模型参数数量
total_params = sum(p.numel() for p in model.parameters())
print(f"总参数量: {total_params:,}")
# 输出: 总参数量: 109,386
\`\`\`

## 深度学习的关键概念

### 前向传播与反向传播

1. **前向传播（Forward Pass）**：数据从输入层逐层传递到输出层
2. **损失函数（Loss Function）**：衡量模型预测值与真实值的差距
3. **反向传播（Backpropagation）**：从输出层反向计算梯度
4. **梯度下降（Gradient Descent）**：根据梯度更新模型参数

\`\`\`python
# 训练循环的基本结构
for epoch in range(num_epochs):
    # 前向传播
    predictions = model(inputs)

    # 计算损失
    loss = loss_function(predictions, targets)

    # 清零梯度
    optimizer.zero_grad()

    # 反向传播
    loss.backward()

    # 更新参数
    optimizer.step()
\`\`\`

## 常见的深度学习架构

| 架构 | 用途 | 示例 |
|------|------|------|
| CNN | 图像处理 | ResNet, VGG |
| RNN/LSTM | 序列数据 | 机器翻译, 语音识别 |
| Transformer | 文本/多模态 | GPT, BERT, ViT |
| GAN | 图像生成 | DALL-E, StyleGAN |
| Diffusion | 图像生成 | Stable Diffusion, Midjourney |

## 思考题

- 为什么深度学习需要激活函数？如果没有激活函数会怎样？
- 参数越多（模型越大）一定越好吗？为什么？
`,
          practice_task: '使用 PyTorch 构建一个简单的神经网络来识别手写数字（MNIST 数据集）。要求：2 个隐藏层，使用 ReLU 激活函数，训练 5 个 epoch，报告测试准确率。',
          estimated_minutes: 45,
          status: 'in_progress',
          completion_rate: 30,
        },
        {
          day_number: 4,
          date: '2026-06-04',
          theme: '自然语言处理（NLP）：让 AI 理解人类语言',
          video_url: 'https://www.youtube.com/watch?v=8rO5l9sOcOI',
          video_duration: 1500,
          doc_content: `# 自然语言处理（NLP）：让 AI 理解人类语言

## 什么是自然语言处理？

自然语言处理（Natural Language Processing，NLP）是 AI 的一个重要分支，研究如何让计算机理解、解释和生成人类语言。

### NLP 的两大核心任务

\`\`\`
NLP
├── 理解（NLU - Natural Language Understanding）
│   ├── 情感分析
│   ├── 命名实体识别
│   ├── 意图识别
│   └── 文本分类
│
└── 生成（NLG - Natural Language Generation）
    ├── 机器翻译
    ├── 文本摘要
    ├── 对话系统
    └── 文章写作
\`\`\`

## 文本预处理基础

\`\`\`python
import re

def preprocess_text(text):
    """基本的文本预处理流程"""

    # 1. 转小写
    text = text.lower()

    # 2. 去除特殊字符
    text = re.sub(r'[^a-zA-Z\\u4e00-\\u9fff\\s]', '', text)

    # 3. 分词（中文需要专门的分词工具）
    # 英文按空格分词
    tokens = text.split()

    # 4. 去除停用词
    stop_words = {'the', 'a', 'is', 'are', 'in', 'on', 'at'}
    tokens = [t for t in tokens if t not in stop_words]

    return tokens

# 示例
text = "Natural Language Processing is amazing!"
tokens = preprocess_text(text)
print(tokens)
# 输出: ['natural', 'language', 'processing', 'amazing']
\`\`\`

## 词向量：将文字变成数字

计算机无法直接理解文字，我们需要将文字转换为数字表示。

### TF-IDF（传统方法）

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer

documents = [
    "人工智能改变世界",
    "机器学习是人工智能的子领域",
    "深度学习推动AI发展",
]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(documents)

print(f"词汇表大小: {len(vectorizer.vocabulary_)}")
print(f"向量维度: {tfidf_matrix.shape}")
# 输出: 词汇表大小: 12, 向量维度: (3, 12)
\`\`\`

### Word Embeddings（词嵌入）

\`\`\`python
# 词嵌入的核心思想：
# 语义相近的词，在向量空间中距离也相近

# 经典示例：
# king - man + woman ≈ queen
# paris - france + china ≈ beijing

# 使用预训练的词向量
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("bert-base-chinese")
model = AutoModel.from_pretrained("bert-base-chinese")

# 编码文本
text = "人工智能正在改变我们的生活方式"
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)

# 获取词向量
word_embeddings = outputs.last_hidden_state
print(f"词向量形状: {word_embeddings.shape}")
# 输出: 词向量形状: torch.Size([1, 14, 768])
\`\`\`

## Transformer 架构：NLP 的革命

2017 年 Google 提出的 Transformer 架构彻底改变了 NLP 领域。

### 自注意力机制（Self-Attention）

\`\`\`python
import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    def __init__(self, embed_dim, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.head_dim = embed_dim // num_heads

        self.W_q = nn.Linear(embed_dim, embed_dim)  # Query
        self.W_k = nn.Linear(embed_dim, embed_dim)  # Key
        self.W_v = nn.Linear(embed_dim, embed_dim)  # Value

    def forward(self, x):
        B, T, C = x.shape

        # 计算 Q, K, V
        Q = self.W_q(x)
        K = self.W_k(x)
        V = self.W_v(x)

        # 注意力分数 = Q * K^T / sqrt(d)
        scores = Q @ K.transpose(-2, -1) / math.sqrt(self.head_dim)

        # Softmax 归一化
        attention = torch.softmax(scores, dim=-1)

        # 加权求和
        out = attention @ V
        return out

# 示例
attn = SelfAttention(embed_dim=512, num_heads=8)
x = torch.randn(1, 10, 512)  # batch=1, seq_len=10, dim=512
output = attn(x)
print(f"输出形状: {output.shape}")
# 输出: torch.Size([1, 10, 512])
\`\`\`

## 大语言模型（LLM）

### GPT 系列的发展

| 模型 | 发布时间 | 参数量 | 关键特点 |
|------|---------|--------|---------|
| GPT-1 | 2018 | 1.17亿 | 验证了预训练+微调范式 |
| GPT-2 | 2019 | 15亿 | 展现了零样本学习能力 |
| GPT-3 | 2020 | 1750亿 | 少样本学习的突破 |
| ChatGPT | 2022 | 未公开 | RLHF 对齐，对话能力飞跃 |
| GPT-4 | 2023 | 未公开 | 多模态，推理能力大幅提升 |

### 简单的文本生成

\`\`\`python
from transformers import pipeline

# 使用预训练模型进行文本生成
generator = pipeline(
    'text-generation',
    model='gpt2'
)

prompt = "Artificial intelligence will"
result = generator(
    prompt,
    max_length=50,
    num_return_sequences=1
)

print(result[0]['generated_text'])
\`\`\`

## 思考题

- 为什么 Transformer 比 RNN/LSTM 更适合处理长文本？
- 大语言模型可能存在哪些偏见和伦理问题？
`,
          practice_task: '使用 Hugging Face Transformers 库加载一个中文预训练模型（如 bert-base-chinese），对一段中文文本进行情感分析（正面/负面），并解释模型输出的含义。',
          estimated_minutes: 45,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 5,
          date: '2026-06-05',
          theme: '计算机视觉：让 AI 看懂世界',
          video_url: 'https://www.youtube.com/watch?v=aircAruvnKk',
          video_duration: 1500,
          doc_content: `# 计算机视觉：让 AI 看懂世界

## 什么是计算机视觉？

计算机视觉（Computer Vision，CV）是让计算机从图像或视频中获取高层理解的技术领域。它是 AI 中最直观、应用最广泛的领域之一。

### CV 的核心任务

\`\`\`
计算机视觉
├── 图像分类（Image Classification）
│   └── 这张图是什么？→ "猫"
├── 目标检测（Object Detection）
│   └── 图中有什么？在哪里？→ "猫在左上角"
├── 图像分割（Image Segmentation）
│   └── 像素级别的分类 → 每个像素属于什么
├── 图像生成（Image Generation）
│   └── 根据描述生成图像 → DALL-E
└── 姿态估计（Pose Estimation）
    └── 人体关键点检测 → 人体姿态分析
\`\`\`

## 图像的数字表示

\`\`\`python
import numpy as np
from PIL import Image

# 图像本质上是数字矩阵
# 彩色图像：高 x 宽 x 3 (RGB)
# 灰度图像：高 x 宽 x 1

# 创建一个简单的图像
image = np.zeros((100, 100, 3), dtype=np.uint8)

# 设置红色方块
image[20:40, 20:40] = [255, 0, 0]    # R
# 设置绿色方块
image[20:40, 60:80] = [0, 255, 0]    # G
# 设置蓝色方块
image[60:80, 20:40] = [0, 0, 255]    # B

# 保存图像
img = Image.fromarray(image)
img.save('rgb_blocks.png')

print(f"图像形状: {image.shape}")
print(f"像素值范围: {image.min()} ~ {image.max()}")
# 输出: 图像形状: (100, 100, 3)
#       像素值范围: 0 ~ 255
\`\`\`

## 卷积神经网络（CNN）

CNN 是计算机视觉的核心架构，模拟人类视觉皮层的工作方式。

### 卷积操作

\`\`\`python
import torch
import torch.nn as nn

# 卷积层
conv = nn.Conv2d(
    in_channels=3,      # RGB 3个通道
    out_channels=16,    # 输出16个特征图
    kernel_size=3,      # 3x3 卷积核
    stride=1,           # 步长
    padding=1           # 填充
)

# 模拟输入图像 (batch=1, channels=3, height=224, width=224)
dummy_image = torch.randn(1, 3, 224, 224)

# 卷积操作
output = conv(dummy_image)
print(f"输入形状: {dummy_image.shape}")
print(f"输出形状: {output.shape}")
# 输出: 输入形状: torch.Size([1, 3, 224, 224])
#       输出形状: torch.Size([1, 16, 224, 224])
\`\`\`

### 经典 CNN 架构

\`\`\`python
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        # 特征提取部分
        self.features = nn.Sequential(
            # 第一卷积块
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),          # 112x112

            # 第二卷积块
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),          # 56x56

            # 第三卷积块
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),          # 28x28
        )

        # 分类部分
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 28 * 28, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = SimpleCNN(num_classes=10)
print(f"模型参数量: {sum(p.numel() for p in model.parameters()):,}")
\`\`\`

## Vision Transformer (ViT)

Transformer 不仅在 NLP 中大放异彩，在计算机视觉领域也取得了巨大成功。

\`\`\`python
# ViT 的核心思想：
# 将图像切分为固定大小的 patch，当作"词"来处理

# 图像 → Patch 序列 → Transformer Encoder → 分类结果
#
# 224x224 图像，patch 大小 16x16
# → 196 个 patch (14x14)
# → 每个 patch 展开为 768 维向量
# → 加上位置编码
# → 送入 Transformer
\`\`\`

## 图像分类实战

\`\`\`python
from transformers import ViTImageProcessor, ViTForImageClassification
from PIL import Image
import torch

# 加载预训练模型
processor = ViTImageProcessor.from_pretrained(
    'google/vit-base-patch16-224'
)
model = ViTForImageClassification.from_pretrained(
    'google/vit-base-patch16-224'
)

# 加载并预处理图像
image = Image.open("cat.jpg")
inputs = processor(images=image, return_tensors="pt")

# 预测
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_id = logits.argmax(-1).item()
    label = model.config.id2label[predicted_id]

print(f"预测结果: {label}")
\`\`\`

## CV 的前沿应用

| 应用 | 技术 | 场景 |
|------|------|------|
| 自动驾驶 | 目标检测 + 语义分割 | Tesla FSD |
| 医学影像 | 图像分类 + 分割 | CT/MRI 诊断 |
| 人脸识别 | 人脸检测 + 特征匹配 | 支付宝刷脸 |
| AR/VR | 深度估计 + 追踪 | Apple Vision Pro |
| AIGC | Diffusion Model | Midjourney, Sora |

## 单元总结

恭喜你完成了第一单元的学习！你已经了解了：

1. AI 的基本概念和发展历史
2. 机器学习的三大类型
3. 深度学习和神经网络
4. 自然语言处理
5. 计算机视觉

**下一步：** 在第二单元中，我们将深入学习 Python 数据科学工具，为后续的 AI 实践打下坚实基础。
`,
          practice_task: '使用 PyTorch 或 Hugging Face 加载一个预训练的图像分类模型（如 ResNet 或 ViT），对 5 张不同的图片进行分类，记录预测结果和置信度，并分析哪些图片容易被误分类。',
          estimated_minutes: 45,
          status: 'locked',
          completion_rate: 0,
        },
      ],
    },
    {
      unit_id: 'unit_02',
      title: 'Python 数据科学实战：AI 开发的必备工具',
      description: '掌握 Python 数据科学生态系统的核心工具，包括 NumPy、Pandas、Matplotlib 和 Scikit-learn，为 AI 开发打下坚实基础。',
      order: 2,
      status: 'locked',
      days: [
        {
          day_number: 6,
          date: '2026-06-08',
          theme: 'NumPy：科学计算的基础',
          video_url: 'https://www.youtube.com/watch?v=QUT1VHiLmmk',
          video_duration: 1200,
          doc_content: `# NumPy：科学计算的基础

## 为什么 NumPy 如此重要？

NumPy（Numerical Python）是 Python 科学计算的基石。几乎所有 AI/ML 框架（PyTorch、TensorFlow、scikit-learn）都建立在 NumPy 的设计理念之上。

### NumPy vs Python 列表

\`\`\`python
import numpy as np

# Python 列表 vs NumPy 数组
python_list = [1, 2, 3, 4, 5]
numpy_array = np.array([1, 2, 3, 4, 5])

# NumPy 支持**向量化运算**，无需循环
print(python_list * 2)     # [1, 2, 3, 4, 5, 1, 2, 3, 4, 5] — 重复列表
print(numpy_array * 2)     # [ 2  4  6  8 10] — 元素乘以2

# 性能对比
import time

size = 1_000_000

# Python 列表
start = time.time()
py_list = list(range(size))
py_result = [x * 2 for x in py_list]
print(f"Python 列表: {time.time() - start:.4f}s")

# NumPy 数组
start = time.time()
np_array = np.arange(size)
np_result = np_array * 2
print(f"NumPy 数组: {time.time() - start:.4f}s")
# NumPy 通常快 10-100 倍
\`\`\`

## 创建 NumPy 数组

\`\`\`python
import numpy as np

# 从列表创建
a = np.array([1, 2, 3, 4, 5])
print(f"一维数组: {a}, 形状: {a.shape}")

# 创建二维数组（矩阵）
b = np.array([[1, 2, 3], [4, 5, 6]])
print(f"二维数组:\\n{b}")
print(f"形状: {b.shape}, 维度: {b.ndim}")

# 常用创建方法
zeros = np.zeros((3, 3))        # 全零矩阵
ones = np.ones((2, 4))          # 全一矩阵
random = np.random.randn(3, 3)  # 标准正态分布随机数
seq = np.arange(0, 10, 2)      # [0 2 4 6 8]
linspace = np.linspace(0, 1, 5) # [0.   0.25 0.5  0.75 1.  ]

print(f"随机矩阵:\\n{random.round(2)}")
\`\`\`

## 数组操作

\`\`\`python
import numpy as np

a = np.array([[1, 2, 3],
              [4, 5, 6]])

# 基本统计
print(f"求和: {a.sum()}")           # 21
print(f"均值: {a.mean()}")          # 3.5
print(f"标准差: {a.std():.2f}")     # 1.71
print(f"最大值: {a.max()}")         # 6
print(f"最大值位置: {a.argmax()}")  # 5

# 沿轴操作
print(f"每列求和: {a.sum(axis=0)}")  # [5 7 9]
print(f"每行求和: {a.sum(axis=1)}")  # [6 15]

# 矩阵运算
b = np.array([[7, 8],
              [9, 10],
              [11, 12]])

# 矩阵乘法
c = a @ b  # 等价于 np.dot(a, b) 或 a.dot(b)
print(f"矩阵乘法结果:\\n{c}")

# 广播机制
d = np.array([[1], [2]])  # 形状 (2, 1)
e = np.array([10, 20, 30])  # 形状 (3,)

f = d + e  # 广播为 (2, 3)
print(f"广播结果:\\n{f}")
# [[11 21 31]
#  [12 22 32]]
\`\`\`

## 在 AI 中的应用

\`\`\`python
# 模拟神经网络中的矩阵运算
import numpy as np

# 输入数据：4 个样本，每个 3 个特征
X = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0],
    [10.0, 11.0, 12.0],
])

# 权重矩阵：3 个输入 → 4 个隐藏神经元
W1 = np.random.randn(3, 4) * 0.01

# 偏置
b1 = np.zeros(4)

# 前向传播：Z = X @ W + b
Z = X @ W1 + b1

# ReLU 激活
A = np.maximum(0, Z)

print(f"输入形状: {X.shape}")      # (4, 3)
print(f"隐藏层输出形状: {A.shape}") # (4, 4)
\`\`\`

## 思考题

- 为什么 NumPy 数组比 Python 列表快？
- 广播机制的规则是什么？
`,
          practice_task: '使用 NumPy 完成以下任务：1) 创建一个 5x5 的随机矩阵；2) 计算每行的均值和标准差；3) 对矩阵进行标准化（每列减去均值除以标准差）；4) 计算矩阵的转置与自身的矩阵乘积。',
          estimated_minutes: 40,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 7,
          date: '2026-06-09',
          theme: 'Pandas：数据分析的瑞士军刀',
          video_url: 'https://www.youtube.com/watch?v=vmEHCJofslg',
          video_duration: 1500,
          doc_content: `# Pandas：数据分析的瑞士军刀

## Pandas 简介

Pandas 是 Python 中最流行的数据分析库，提供了 DataFrame 和 Series 两种核心数据结构，让数据操作变得简单高效。

## DataFrame 基础

\`\`\`python
import pandas as pd
import numpy as np

# 创建 DataFrame
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '年龄': [25, 30, 35, 28, 32],
    '城市': ['北京', '上海', '广州', '深圳', '杭州'],
    '薪资': [15000, 20000, 18000, 25000, 22000],
    '评分': [4.5, 4.2, 4.8, 3.9, 4.6],
}

df = pd.DataFrame(data)
print(df)
#    姓名  年龄  城市     薪资   评分
# 0  张三   25  北京  15000  4.5
# 1  李四   30  上海  20000  4.2
# 2  王五   35  广州  18000  4.8
# 3  赵六   28  深圳  25000  3.9
# 4  钱七   32  杭州  22000  4.6
\`\`\`

## 数据探索

\`\`\`python
# 查看基本信息
print(df.info())       # 数据类型、非空值数量
print(df.describe())   # 统计摘要
print(df.head(3))      # 前3行
print(df.shape)        # (5, 5)

# 选择数据
print(df['姓名'])              # 选择列
print(df[['姓名', '薪资']])    # 选择多列
print(df.iloc[0])              # 按位置选择行
print(df.loc[df['年龄'] > 30])  # 条件筛选

# 排序
print(df.sort_values('薪资', ascending=False))
\`\`\`

## 数据清洗

\`\`\`python
# 创建含缺失值的数据
df_dirty = pd.DataFrame({
    '产品': ['A', 'B', 'C', 'D', 'E'],
    '销量': [100, None, 200, 150, None],
    '价格': [10.5, 20.0, None, 15.0, 25.0],
})

# 检查缺失值
print(df_dirty.isnull().sum())

# 处理缺失值
df_filled = df_dirty.fillna({
    '销量': df_dirty['销量'].mean(),  # 用均值填充
    '价格': df_dirty['价格'].median(), # 用中位数填充
})

# 删除含缺失值的行
df_clean = df_dirty.dropna()

print("填充后:")
print(df_filled)
\`\`\`

## 数据分组与聚合

\`\`\`python
# 创建更丰富的数据
sales_data = pd.DataFrame({
    '城市': ['北京', '上海', '北京', '上海', '广州', '北京'],
    '产品': ['手机', '手机', '电脑', '电脑', '手机', '电脑'],
    '销量': [100, 150, 80, 120, 90, 110],
    '收入': [500000, 750000, 640000, 960000, 450000, 880000],
})

# 按城市分组
city_stats = sales_data.groupby('城市').agg({
    '销量': ['sum', 'mean'],
    '收入': 'sum'
})
print("各城市统计:")
print(city_stats)

# 交叉表
pivot = sales_data.pivot_table(
    values='销量',
    index='城市',
    columns='产品',
    aggfunc='sum'
)
print("\\n交叉表:")
print(pivot)
\`\`\`

## 在 AI 项目中的典型应用

\`\`\`python
# AI 项目中的数据预处理流程
def preprocess_dataset(filepath):
    """典型的 AI 数据预处理流程"""

    # 1. 读取数据
    df = pd.read_csv(filepath)

    # 2. 查看数据概况
    print(f"数据形状: {df.shape}")
    print(f"缺失值:\\n{df.isnull().sum()}")

    # 3. 处理缺失值
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    df[numeric_cols] = df[numeric_cols].fillna(
        df[numeric_cols].mean()
    )

    # 4. 类别编码
    categorical_cols = df.select_dtypes(include=['object']).columns
    df = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

    # 5. 特征标准化
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler()
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

    return df

# 使用示例
# df = preprocess_dataset('house_prices.csv')
# X = df.drop('target', axis=1)
# y = df['target']
\`\`\`

## 思考题

- DataFrame 和 NumPy 数组各适合什么场景？
- 如何高效处理百万级别的数据集？
`,
          practice_task: '从 Kaggle 下载一个真实数据集（如 Titanic 或 House Prices），使用 Pandas 进行完整的数据探索：查看数据概况、处理缺失值、计算统计量、创建可视化图表，并写出你的数据分析发现。',
          estimated_minutes: 45,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 8,
          date: '2026-06-10',
          theme: '数据可视化：Matplotlib 与 Seaborn',
          video_url: 'https://www.youtube.com/watch?v=3Xc3CA655Y4',
          video_duration: 1200,
          doc_content: `# 数据可视化：Matplotlib 与 Seaborn

## 为什么数据可视化很重要？

> "一图胜千言" —— 在 AI/ML 项目中，数据可视化帮助我们理解数据分布、发现异常值、评估模型性能。

## Matplotlib 基础

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 创建画布
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. 折线图 — 展示趋势
x = np.arange(2018, 2027)
ai_market = [50, 80, 120, 180, 300, 500, 800, 1200, 1800]
axes[0, 0].plot(x, ai_market, 'b-o', linewidth=2, markersize=8)
axes[0, 0].set_title('全球 AI 市场规模 (亿美元)')
axes[0, 0].set_xlabel('年份')
axes[0, 0].set_ylabel('规模')
axes[0, 0].grid(True, alpha=0.3)

# 2. 柱状图 — 对比数据
categories = ['NLP', 'CV', '推荐系统', '语音', '其他']
market_share = [35, 30, 20, 10, 5]
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
axes[0, 1].bar(categories, market_share, color=colors)
axes[0, 1].set_title('AI 各领域市场份额')
axes[0, 1].set_ylabel('占比 (%)')

# 3. 散点图 — 展示关系
np.random.seed(42)
experience = np.random.uniform(0, 10, 100)
salary = 5 + 3 * experience + np.random.normal(0, 2, 100)
axes[1, 0].scatter(experience, salary, alpha=0.6, c='coral')
axes[1, 0].set_title('工作经验 vs 薪资')
axes[1, 0].set_xlabel('经验 (年)')
axes[1, 0].set_ylabel('薪资 (千元)')

# 4. 饼图 — 占比
labels = ['训练', '推理', '数据处理', '部署', '其他']
times = [40, 20, 25, 10, 5]
axes[1, 1].pie(times, labels=labels, autopct='%1.1f%%',
               colors=colors, startangle=90)
axes[1, 1].set_title('AI 项目时间分配')

plt.tight_layout()
plt.savefig('ai_overview.png', dpi=150)
plt.show()
\`\`\`

## Seaborn：更高级的可视化

\`\`\`python
import seaborn as sns
import pandas as pd
import numpy as np

# 创建示例数据
np.random.seed(42)
n = 200

df = pd.DataFrame({
    '模型': np.random.choice(
        ['GPT-4', 'Claude', 'Gemini', 'Llama', 'Qwen'],
        n
    ),
    '准确率': np.random.uniform(70, 98, n),
    '推理速度': np.random.uniform(10, 100, n),
    '参数量': np.random.choice(['小', '中', '大'], n),
})

# 1. 箱线图 — 数据分布
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

sns.boxplot(data=df, x='模型', y='准确率', ax=axes[0])
axes[0].set_title('各模型准确率分布')
axes[0].tick_params(axis='x', rotation=45)

# 2. 散点图 + 回归线
sns.regplot(data=df, x='推理速度', y='准确率',
            ax=axes[1], scatter_kws={'alpha': 0.5})
axes[1].set_title('推理速度 vs 准确率')

plt.tight_layout()
plt.savefig('model_comparison.png', dpi=150)
plt.show()

# 3. 热力图 — 相关性矩阵
numeric_df = df.select_dtypes(include=[np.number])
corr_matrix = numeric_df.corr()

plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm',
            center=0, fmt='.2f')
plt.title('特征相关性热力图')
plt.savefig('correlation_heatmap.png', dpi=150)
plt.show()
\`\`\`

## AI 模型评估可视化

\`\`\`python
# 混淆矩阵可视化
from sklearn.metrics import confusion_matrix
import seaborn as sns

y_true = [0, 1, 0, 1, 1, 0, 1, 0, 0, 1]
y_pred = [0, 1, 0, 0, 1, 0, 1, 1, 0, 1]

cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['负类', '正类'],
            yticklabels=['负类', '正类'])
plt.xlabel('预测值')
plt.ylabel('真实值')
plt.title('混淆矩阵')
plt.show()
\`\`\`

## 思考题

- 什么场景适合用折线图、柱状图、散点图？
- 如何选择合适的颜色方案来提升图表的可读性？
`,
          practice_task: '选择一个真实数据集，创建一个完整的数据可视化报告，包含至少 4 种不同类型的图表（折线图、柱状图、散点图、热力图），并附上数据洞察说明。',
          estimated_minutes: 40,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 9,
          date: '2026-06-11',
          theme: 'Scikit-learn：机器学习实战',
          video_url: 'https://www.youtube.com/watch?v=pOnRSYpRa2s',
          video_duration: 1800,
          doc_content: `# Scikit-learn：机器学习实战

## Scikit-learn 简介

Scikit-learn 是 Python 中最经典的机器学习库，提供了丰富的算法实现和统一的 API 设计。

## 统一的 API 设计

\`\`\`python
# Scikit-learn 的核心 API 模式：
# 1. 创建模型实例
# 2. fit() — 训练模型
# 3. predict() — 做出预测
# 4. score() — 评估模型

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report

# 通用流程
def train_and_evaluate(model, X, y):
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # 数据标准化
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    # 训练
    model.fit(X_train, y_train)

    # 预测
    y_pred = model.predict(X_test)

    # 评估
    accuracy = accuracy_score(y_test, y_pred)
    print(f"准确率: {accuracy:.4f}")
    print(classification_report(y_test, y_pred))

    return model, scaler
\`\`\`

## 分类算法实战

\`\`\`python
from sklearn.datasets import load_breast_cancer
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier

# 加载数据
data = load_breast_cancer()
X, y = data.data, data.target

print(f"特征数量: {X.shape[1]}")
print(f"样本数量: {X.shape[0]}")
print(f"类别: {data.target_names}")

# 比较不同算法
algorithms = {
    '决策树': DecisionTreeClassifier(random_state=42),
    '随机森林': RandomForestClassifier(n_estimators=100, random_state=42),
    'SVM': SVC(kernel='rbf', random_state=42),
    'KNN': KNeighborsClassifier(n_neighbors=5),
}

for name, model in algorithms.items():
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    print(f"{name}: 准确率 = {score:.4f}")
\`\`\`

## 回归算法实战

\`\`\`python
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score

# 加载加州房价数据
housing = fetch_california_housing()
X, y = housing.data, housing.target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 比较回归算法
regressors = {
    '线性回归': LinearRegression(),
    '岭回归': Ridge(alpha=1.0),
    '梯度提升': GradientBoostingRegressor(n_estimators=100, random_state=42),
}

for name, model in regressors.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"{name}:")
    print(f"  MSE: {mse:.4f}")
    print(f"  R²:  {r2:.4f}")
\`\`\`

## 模型选择与调优

\`\`\`python
from sklearn.model_selection import GridSearchCV, cross_val_score

# 网格搜索：寻找最佳参数
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10],
}

grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,          # 5折交叉验证
    scoring='accuracy',
    n_jobs=-1       # 使用所有CPU核心
)

# grid_search.fit(X_train, y_train)
# print(f"最佳参数: {grid_search.best_params_}")
# print(f"最佳分数: {grid_search.best_score_:.4f}")

# 交叉验证
model = RandomForestClassifier(n_estimators=100, random_state=42)
scores = cross_val_score(model, X, y, cv=5)
print(f"交叉验证准确率: {scores.mean():.4f} (+/- {scores.std():.4f})")
\`\`\`

## 特征重要性分析

\`\`\`python
# 训练随机森林并分析特征重要性
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 获取特征重要性
importances = model.feature_importances_
feature_names = housing.feature_names

# 排序并可视化
indices = importances.argsort()[::-1]

plt.figure(figsize=(10, 6))
plt.bar(range(len(indices)), importances[indices])
plt.xticks(range(len(indices)),
           [feature_names[i] for i in indices],
           rotation=90)
plt.title('特征重要性排序')
plt.tight_layout()
plt.show()
\`\`\`

## 思考题

- 如何避免过拟合？有哪些正则化方法？
- 交叉验证为什么比简单的训练/测试分割更可靠？
`,
          practice_task: '使用 Scikit-learn 完成一个完整的 ML 项目：1) 选择一个数据集；2) 进行数据探索和预处理；3) 尝试至少 3 种不同的算法；4) 使用网格搜索调优最佳模型；5) 使用交叉验证评估；6) 分析特征重要性并写出结论。',
          estimated_minutes: 60,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 10,
          date: '2026-06-12',
          theme: '综合实战：构建一个完整的 ML 项目',
          video_url: 'https://www.youtube.com/watch?v=1O_BenficgE',
          video_duration: 1800,
          doc_content: `# 综合实战：构建一个完整的 ML 项目

## 项目概述

今天我们将综合运用前几天的知识，从零构建一个完整的机器学习项目：**客户流失预测**。

### 项目流程

\`\`\`
1. 问题定义
2. 数据收集
3. 数据探索 (EDA)
4. 数据预处理
5. 特征工程
6. 模型训练与选择
7. 模型评估
8. 结果分析与报告
\`\`\`

## 完整项目代码

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import (
    train_test_split, cross_val_score, GridSearchCV
)
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import (
    RandomForestClassifier, GradientBoostingClassifier
)
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    classification_report, confusion_matrix, roc_auc_score
)
import warnings
warnings.filterwarnings('ignore')

# ============================================================
# 1. 生成模拟数据（实际项目中使用 pd.read_csv()）
# ============================================================
np.random.seed(42)
n_samples = 1000

data = pd.DataFrame({
    '年龄': np.random.randint(18, 70, n_samples),
    '月消费': np.random.uniform(50, 500, n_samples),
    '使用月数': np.random.randint(1, 60, n_samples),
    '客服投诉次数': np.random.poisson(2, n_samples),
    '合同类型': np.random.choice(
        ['月付', '季付', '年付'], n_samples, p=[0.5, 0.3, 0.2]
    ),
    '满意度': np.random.uniform(1, 5, n_samples),
})

# 生成流失标签（有一定逻辑）
churn_prob = (
    0.3
    + 0.01 * data['客服投诉次数']
    - 0.005 * data['使用月数']
    - 0.001 * data['月消费']
    + 0.2 * (data['合同类型'] == '月付')
    - 0.1 * data['满意度']
)
data['是否流失'] = (churn_prob > np.random.uniform(0, 1, n_samples)).astype(int)

print(f"数据形状: {data.shape}")
print(f"流失率: {data['是否流失'].mean():.2%}")

# ============================================================
# 2. 数据探索
# ============================================================
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 流失分布
data['是否流失'].value_counts().plot.pie(
    ax=axes[0, 0], autopct='%1.1f%%',
    labels=['未流失', '流失']
)
axes[0, 0].set_title('客户流失分布')

# 年龄分布
data.groupby('是否流失')['年龄'].plot.kde(ax=axes[0, 1])
axes[0, 1].legend(['未流失', '流失'])
axes[0, 1].set_title('年龄分布对比')

# 月消费 vs 流失
data.boxplot(column='月消费', by='是否流失', ax=axes[1, 0])
axes[1, 0].set_title('月消费 vs 流失')

# 满意度 vs 流失
data.boxplot(column='满意度', by='是否流失', ax=axes[1, 1])
axes[1, 1].set_title('满意度 vs 流失')

plt.tight_layout()
plt.savefig('eda_churn.png', dpi=150)

# ============================================================
# 3. 数据预处理
# ============================================================
# 类别编码
le = LabelEncoder()
data['合同类型_编码'] = le.fit_transform(data['合同类型'])

# 特征和标签
feature_cols = ['年龄', '月消费', '使用月数', '客服投诉次数',
                '合同类型_编码', '满意度']
X = data[feature_cols]
y = data['是否流失']

# 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# 标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ============================================================
# 4. 模型训练与比较
# ============================================================
models = {
    '逻辑回归': LogisticRegression(max_iter=1000),
    '随机森林': RandomForestClassifier(n_estimators=100, random_state=42),
    '梯度提升': GradientBoostingClassifier(n_estimators=100, random_state=42),
}

results = {}
for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    y_prob = model.predict_proba(X_test_scaled)[:, 1]

    results[name] = {
        'accuracy': model.score(X_test_scaled, y_test),
        'roc_auc': roc_auc_score(y_test, y_prob),
        'model': model
    }

    print(f"\\n{name}:")
    print(f"  准确率: {results[name]['accuracy']:.4f}")
    print(f"  AUC:   {results[name]['roc_auc']:.4f}")

# ============================================================
# 5. 最佳模型分析
# ============================================================
best_model = max(results.items(), key=lambda x: x[1]['roc_auc'])
print(f"\\n最佳模型: {best_model[0]}")

# 特征重要性（随机森林）
rf_model = results['随机森林']['model']
importances = pd.Series(
    rf_model.feature_importances_, index=feature_cols
).sort_values(ascending=False)

plt.figure(figsize=(8, 4))
importances.plot.barh()
plt.title('特征重要性')
plt.tight_layout()
plt.savefig('feature_importance.png', dpi=150)

print("\\n项目完成！")
\`\`\`

## 单元总结

恭喜完成第二单元！你现在掌握了：

1. **NumPy** — 高效的数值计算
2. **Pandas** — 灵活的数据处理
3. **Matplotlib/Seaborn** — 专业的数据可视化
4. **Scikit-learn** — 完整的 ML 工作流
5. **综合实战** — 端到端的 ML 项目

**下一步：** 第三单元将探索 AI 的前沿领域，包括大语言模型、AI Agent 和多模态 AI。
`,
          practice_task: '独立完成一个完整的 ML 项目。可以从 Kaggle 选择一个感兴趣的数据集，按照本课的项目流程，从数据探索到模型部署，完成所有步骤，并写一份项目报告。',
          estimated_minutes: 60,
          status: 'locked',
          completion_rate: 0,
        },
      ],
    },
    {
      unit_id: 'unit_03',
      title: 'AI 前沿探索：大模型、Agent 与多模态',
      description: '了解当前 AI 领域最前沿的技术趋势，包括大语言模型（LLM）、AI Agent、多模态 AI 等，把握行业发展方向。',
      order: 3,
      status: 'locked',
      days: [
        {
          day_number: 11,
          date: '2026-06-15',
          theme: '大语言模型（LLM）深入解析',
          video_url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
          video_duration: 1500,
          doc_content: `# 大语言模型（LLM）深入解析

## LLM 是什么？

大语言模型（Large Language Model，LLM）是基于 Transformer 架构、在海量文本数据上训练的超大规模神经网络。它们能够理解和生成人类语言，是目前 AI 领域最具影响力的技术。

### 主流 LLM 对比

| 模型 | 开发者 | 参数量 | 特点 |
|------|--------|--------|------|
| GPT-4o | OpenAI | 未公开 | 多模态，推理能力强 |
| Claude 3.5 | Anthropic | 未公开 | 长文本，安全对齐 |
| Gemini | Google | 未公开 | 原生多模态 |
| Llama 3 | Meta | 8B-405B | 开源，可本地部署 |
| Qwen 2.5 | 阿里 | 0.5B-72B | 中文能力强，开源 |

## LLM 的核心概念

### Token 与 Tokenization

\`\`\`python
# Token 是 LLM 处理文本的基本单位
# 一个 token 大约是 0.75 个英文单词，或 0.5 个中文字

text = "人工智能改变世界"

# 使用 tiktoken 计算 token 数量
import tiktoken
enc = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode(text)
print(f"Token 数量: {len(tokens)}")
print(f"Token 列表: {tokens}")
print(f"解码: {enc.decode(tokens)}")
\`\`\`

### Prompt Engineering（提示工程）

\`\`\`python
# 提示工程是与 LLM 有效沟通的关键技能

# 1. 基础提示
basic_prompt = "解释什么是机器学习"

# 2. 角色提示
role_prompt = """你是一位有 20 年经验的 AI 教授。
请用通俗易懂的语言解释机器学习的概念，
适合完全没有编程基础的学生理解。"""

# 3. Few-shot 提示
few_shot_prompt = """
将以下句子翻译为英文：
中文: 今天天气很好 → 英文: The weather is nice today
中文: 我喜欢编程 → 英文: I like programming
中文: 人工智能很有趣 → 英文:
"""

# 4. Chain-of-Thought（思维链）
cot_prompt = """
问题：一个商店打 8 折后又打 9 折，相当于打几折？

请一步步思考：
1. 首先计算打 8 折后的价格比例
2. 然后计算再打 9 折后的价格比例
3. 得出最终折扣
"""
\`\`\`

## 使用 API 调用 LLM

\`\`\`python
import openai

client = openai.OpenAI(api_key="your-api-key")

# 基本对话
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个 AI 学习助手。"},
        {"role": "user", "content": "什么是 Transformer 架构？"}
    ]
)

print(response.choices[0].message.content)

# 流式输出
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "讲一个关于 AI 的故事"}],
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
\`\`\`

## RAG（检索增强生成）

\`\`\`python
# RAG 结合了信息检索和文本生成
# 让 LLM 基于特定知识库回答问题

# 简化的 RAG 流程
def simple_rag(question, knowledge_base, llm):
    """
    1. 将问题转换为向量
    2. 在知识库中检索相关文档
    3. 将检索结果作为上下文提供给 LLM
    4. LLM 基于上下文生成回答
    """
    # 步骤 1 & 2: 检索相关文档
    relevant_docs = retrieve(
        question, knowledge_base, top_k=3
    )

    # 步骤 3: 构建增强提示
    context = "\\n".join(relevant_docs)
    augmented_prompt = f"""
    基于以下参考资料回答问题：

    参考资料：
    {context}

    问题：{question}

    请基于参考资料回答，如果资料中没有相关信息，请说明。
    """

    # 步骤 4: LLM 生成回答
    answer = llm.generate(augmented_prompt)
    return answer
\`\`\`

## 思考题

- LLM 的"智能"是真正的理解还是模式匹配？
- 如何评估一个 LLM 的质量？有哪些指标？
`,
          practice_task: '使用 OpenAI API 或开源 LLM（如通过 Ollama 本地部署 Qwen），实现一个简单的 RAG 系统：准备 5 篇关于 AI 的文档作为知识库，实现检索和问答功能。',
          estimated_minutes: 45,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 12,
          date: '2026-06-16',
          theme: 'AI Agent：从对话到行动',
          video_url: 'https://www.youtube.com/watch?v=7jKADnJG1cE',
          video_duration: 1500,
          doc_content: `# AI Agent：从对话到行动

## 什么是 AI Agent？

AI Agent（AI 智能体）是能够**自主感知环境、做出决策并执行行动**的 AI 系统。与传统的 LLM 对话不同，Agent 能够使用工具、调用 API、完成复杂任务。

### LLM vs AI Agent

\`\`\`
LLM Chatbot:  用户 → LLM → 文本回答
AI Agent:     用户 → Agent → [思考] → 使用工具 → [思考] → 执行行动 → 结果
\`\`\`

## Agent 的核心架构

\`\`\`python
class AIAgent:
    """AI Agent 的基本架构"""

    def __init__(self, llm, tools, memory):
        self.llm = llm          # 大语言模型（大脑）
        self.tools = tools        # 可用工具（双手）
        self.memory = memory      # 记忆系统（记忆）
        self.planner = None       # 规划器（思考）

    def run(self, task):
        """执行任务的完整循环"""
        # 1. 理解任务
        understanding = self.llm.analyze(task)

        # 2. 制定计划
        plan = self.planner.make_plan(understanding)

        # 3. 逐步执行
        results = []
        for step in plan:
            # 选择合适的工具
            tool = self.select_tool(step)

            # 执行工具
            result = tool.execute(step.params)

            # 更新记忆
            self.memory.store(step, result)
            results.append(result)

        # 4. 综合结果
        final_answer = self.llm.synthesize(results)
        return final_answer
\`\`\`

## 工具使用（Function Calling）

\`\`\`python
import json

# 定义工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"]
                    }
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "搜索互联网获取最新信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "搜索关键词"
                    }
                },
                "required": ["query"]
            }
        }
    }
]

# Agent 调用工具的流程
def agent_with_tools(user_message):
    # 1. LLM 决定是否需要调用工具
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": user_message}
        ],
        tools=tools,
        tool_choice="auto"
    )

    message = response.choices[0].message

    # 2. 如果需要调用工具
    if message.tool_calls:
        for tool_call in message.tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(
                tool_call.function.arguments
            )

            # 执行工具
            if function_name == "get_weather":
                result = get_weather(**function_args)
            elif function_name == "search_web":
                result = search_web(**function_args)

            # 将工具结果返回给 LLM
            # ... LLM 基于工具结果继续对话

    return message.content
\`\`\`

## ReAct 模式

ReAct（Reasoning + Acting）是 Agent 最常用的推理模式。

\`\`\`
问题：今天北京天气如何？适合户外运动吗？

思考（Reasoning）：我需要先查询北京的天气信息。
行动（Acting）：调用 get_weather(city="北京")
观察（Observation）：北京今天晴天，温度 28°C，空气质量良好。
思考（Reasoning）：天气晴朗，温度适宜，空气质量好，适合户外运动。
回答：今天北京天气晴朗，28°C，空气质量良好，非常适合户外运动！
\`\`\`

## 常见 Agent 框架

| 框架 | 特点 | 适用场景 |
|------|------|---------|
| LangChain | 生态丰富，组件多 | 复杂的 LLM 应用 |
| AutoGen | 多 Agent 协作 | 多角色对话任务 |
| CrewAI | 角色扮演式 | 模拟团队协作 |
| Dify | 低代码平台 | 快速构建 Agent |

## 思考题

- AI Agent 和传统的自动化脚本有什么本质区别？
- Agent 的自主性应该有哪些边界和限制？
`,
          practice_task: '使用 LangChain 或类似框架，构建一个简单的 AI Agent，该 Agent 能够：1) 搜索网络获取最新信息；2) 进行数学计算；3) 读取本地文件。测试 Agent 在至少 3 个不同任务上的表现。',
          estimated_minutes: 45,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 13,
          date: '2026-06-17',
          theme: '多模态 AI：文本、图像、语音的融合',
          video_url: 'https://www.youtube.com/watch?v=2kQq2FQ7YqE',
          video_duration: 1200,
          doc_content: `# 多模态 AI：文本、图像、语音的融合

## 什么是多模态 AI？

多模态 AI（Multimodal AI）是指能够同时处理和理解**多种类型数据**（文本、图像、音频、视频等）的 AI 系统。

### 单模态 vs 多模态

\`\`\`
单模态 AI:
  文本 → [文本模型] → 文本输出
  图像 → [视觉模型] → 分类结果

多模态 AI:
  文本 + 图像 → [多模态模型] → 文本/图像/语音输出
\`\`\`

## 多模态模型的发展

| 模型 | 公司 | 模态 | 发布年份 |
|------|------|------|---------|
| CLIP | OpenAI | 文本+图像 | 2021 |
| DALL-E 2 | OpenAI | 文本→图像 | 2022 |
| GPT-4V | OpenAI | 文本+图像 | 2023 |
| Gemini | Google | 文本+图像+音频+视频 | 2023 |
| GPT-4o | OpenAI | 文本+图像+音频 | 2024 |

## 图像理解

\`\`\`python
# 使用多模态模型理解图像
from openai import OpenAI

client = OpenAI()

# 分析图片内容
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "请详细描述这张图片中的内容。"
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/photo.jpg"
                    }
                }
            ]
        }
    ]
)

print(response.choices[0].message.content)
\`\`\`

## 图像生成

\`\`\`python
# 文生图
response = client.images.generate(
    model="dall-e-3",
    prompt="一只穿着宇航服的猫在月球上弹吉他，"
           "背景是蓝色地球，科幻风格",
    size="1024x1024",
    quality="hd",
    n=1
)

image_url = response.data[0].url
print(f"生成的图片: {image_url}")

# 图像编辑
response = client.images.edit(
    model="dall-e-2",
    image=open("original.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="将背景改为海滩",
    n=1
)
\`\`\`

## 语音处理

\`\`\`python
# 语音转文字（STT）
with open("speech.mp3", "rb") as audio_file:
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        language="zh"
    )
print(f"转录结果: {transcription.text}")

# 文字转语音（TTS）
speech = client.audio.speech.create(
    model="tts-1",
    voice="nova",
    input="你好，欢迎使用 AI Daily Learn！"
)

with open("output.mp3", "wb") as f:
    f.write(speech.content)
\`\`\`

## 多模态 AI 的应用场景

\`\`\`python
# 场景 1: 智能文档分析
def analyze_document(image_path, query):
    """分析文档图片并回答问题"""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": query},
                {"type": "image_url",
                 "image_url": {"url": image_path}}
            ]
        }]
    )
    return response.choices[0].message.content

# 场景 2: 视觉问答
answer = analyze_document(
    "chart.png",
    "这张图表展示了什么趋势？请总结关键数据。"
)

# 场景 3: 多模态内容创作
def create_multimodal_content(topic):
    """创建包含文字和图片的内容"""
    # 生成文章
    article = generate_article(topic)

    # 为文章配图
    image = generate_image(
        f"为以下文章配图: {article[:200]}"
    )

    # 生成朗读音频
    audio = generate_speech(article)

    return {
        "article": article,
        "image": image,
        "audio": audio
    }
\`\`\`

## 思考题

- 多模态 AI 相比单模态 AI 有哪些优势？
- 多模态 AI 在隐私和安全方面面临哪些新挑战？
`,
          practice_task: '使用 GPT-4o 或其他多模态 API，实现一个"智能图片分析助手"：上传一张包含文字或图表的图片，让 AI 提取其中的信息、总结内容，并用语音播报结果。',
          estimated_minutes: 45,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 14,
          date: '2026-06-18',
          theme: 'AI 伦理与安全：负责任的 AI 发展',
          video_url: 'https://www.youtube.com/watch?v=51_Fr8oZjyI',
          video_duration: 1200,
          doc_content: `# AI 伦理与安全：负责任的 AI 发展

## 为什么 AI 伦理如此重要？

随着 AI 技术的快速发展，其对社会的影响日益深远。确保 AI 的**安全、公平、透明**是每一个 AI 从业者的责任。

## AI 的主要风险

### 1. 偏见与歧视

\`\`\`python
# AI 偏见的真实案例
# 某招聘 AI 系统被发现对女性存在偏见

biased_data = {
    "历史简历": {
        "男性": {"录用率": 0.65, "数量": 10000},
        "女性": {"录用率": 0.35, "数量": 5000},
    }
}

# AI 从有偏见的历史数据中学习了偏见
# 导致对女性求职者的评分系统性偏低

# 检测偏见的代码示例
def check_bias(model, test_data, sensitive_attribute):
    """检测模型是否存在偏见"""
    groups = test_data[sensitive_attribute].unique()

    for group in groups:
        subset = test_data[test_data[sensitive_attribute] == group]
        predictions = model.predict(subset.features)

        positive_rate = predictions.mean()
        print(f"{group}: 正面预测率 = {positive_rate:.2%}")

    # 如果不同群体的正面预测率差异过大，存在偏见
\`\`\`

### 2. 隐私问题

\`\`\`python
# AI 训练数据中的隐私风险

privacy_concerns = {
    "数据收集": "未经同意收集个人数据用于训练",
    "数据记忆": "LLM 可能泄露训练数据中的个人信息",
    "推理攻击": "通过模型输出反推训练数据",
    "深度伪造": "AI 生成逼真的虚假内容",
}

# 差分隐私示例
from diffprivlib.mechanisms import Gaussian

# 添加噪声保护隐私
sensitive_value = 50000  # 真实薪资
mechanism = Gaussian(epsilon=1.0, delta=1e-5)
noisy_value = mechanism.randomise(sensitive_value)

print(f"真实值: {sensitive_value}")
print(f"加噪后: {noisy_value:.0f}")
# 仍然能反映趋势，但无法确定具体值
\`\`\`

### 3. 幻觉（Hallucination）

\`\`\`python
# LLM 幻觉问题

hallucination_examples = [
    {
        "用户问": "爱因斯坦在哪年获得诺贝尔物理学奖？",
        "正确答案": "1921年",
        "LLM可能回答": "1922年",  # 自信地给出错误答案
    },
    {
        "用户问": "请引用《三体》中的一句话",
        "LLM可能回答": "\"给岁月以文明\"（实际不存在于书中）",
    }
]

# 缓解幻觉的方法
def reduce_hallucination(query, llm):
    # 1. 要求引用来源
    prompt = f"{query} 请给出信息来源。"

    # 2. 使用 RAG 基于事实回答
    answer = rag_system.answer(query)

    # 3. 让模型自我验证
    verification = llm.verify(answer)

    # 4. 设置置信度阈值
    if verification.confidence < 0.8:
        return "我对此不太确定，建议您查证相关信息。"

    return answer
\`\`\`

## AI 安全框架

\`\`\`python
# AI 安全检查清单
safety_checklist = {
    "数据安全": [
        "训练数据是否经过隐私审查？",
        "是否获得了数据使用授权？",
        "是否使用了差分隐私等技术？",
    ],
    "模型安全": [
        "是否进行了对抗攻击测试？",
        "是否有内容过滤机制？",
        "是否设置了使用边界？",
    ],
    "公平性": [
        "是否检测了不同群体的表现差异？",
        "是否对偏见进行了缓解？",
        "是否进行了多样化测试？",
    ],
    "透明度": [
        "模型的能力和限制是否清楚说明？",
        "用户是否知道自己在与 AI 交互？",
        "决策过程是否可解释？",
    ],
    "可追溯性": [
        "是否有日志记录机制？",
        "是否有审计追踪？",
        "是否有反馈和修正机制？",
    ],
}
\`\`\`

## AI 治理与法规

| 地区 | 法规 | 核心内容 |
|------|------|---------|
| 欧盟 | AI Act | 风险分级管理，禁止社会评分 |
| 中国 | 《生成式AI管理办法》 | 内容安全，实名制，算法备案 |
| 美国 | AI Executive Order | 安全标准，隐私保护 |
| 全球 | UNESCO AI 伦理准则 | 人类监督，公平，可持续 |

## 思考题

- 作为 AI 开发者，如何在推动创新和确保安全之间取得平衡？
- 你认为 AI 监管应该由政府、行业还是技术社区主导？
`,
          practice_task: '选择一个 AI 产品（如 ChatGPT、文心一言等），从数据隐私、偏见、幻觉、透明度四个维度进行评估，写一份简短的 AI 安全评估报告，并提出改进建议。',
          estimated_minutes: 40,
          status: 'locked',
          completion_rate: 0,
        },
        {
          day_number: 15,
          date: '2026-06-19',
          theme: 'AI 学习路线与职业规划',
          video_url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
          video_duration: 1200,
          doc_content: `# AI 学习路线与职业规划

## AI 学习路线图

### L1 入门阶段（当前阶段）

\`\`\`
已完成:
  [x] AI 基础概念
  [x] 机器学习基础
  [x] 深度学习入门
  [x] NLP 和 CV 基础
  [x] Python 数据科学工具
  [x] Scikit-learn 实战
  [x] LLM 和 Agent 概念
  [x] 多模态 AI 概览
  [x] AI 伦理与安全
\`\`\`

### L2 进阶阶段（12-24 周）

\`\`\`
待学习:
  [ ] PyTorch 深度学习框架
  [ ] Transformer 架构深入
  [ ] 大模型微调（LoRA, QLoRA）
  [ ] RAG 系统开发
  [ ] AI Agent 开发实战
  [ ] MLOps 和模型部署
  [ ] 计算机视觉项目实战
  [ ] 自然语言处理项目实战
\`\`\`

### L3 高级阶段（24-48 周）

\`\`\`
待学习:
  [ ] 模型训练与优化
  [ ] 分布式训练
  [ ] AI 系统架构设计
  [ ] 前沿论文阅读与复现
  [ ] 开源贡献
  [ ] 个人 AI 项目作品集
\`\`\`

## AI 职业方向

### 1. AI 工程师

\`\`\`python
# AI 工程师的核心技能
ai_engineer_skills = {
    "编程": ["Python", "C++", "CUDA"],
    "框架": ["PyTorch", "TensorFlow", "Hugging Face"],
    "部署": ["Docker", "FastAPI", "ONNX", "TensorRT"],
    "工具": ["Git", "Linux", "云服务"],
    "数学": ["线性代数", "概率统计", "微积分"],
}
\`\`\`

### 2. 数据科学家

\`\`\`python
data_scientist_skills = {
    "分析": ["Pandas", "SQL", "统计分析"],
    "可视化": ["Matplotlib", "Tableau", "ECharts"],
    "建模": ["Scikit-learn", "XGBoost", "LightGBM"],
    "业务": ["AB测试", "指标体系", "因果推断"],
}
\`\`\`

### 3. AI 产品经理

\`\`\`python
ai_pm_skills = {
    "产品": ["需求分析", "用户研究", "产品设计"],
    "AI理解": ["AI能力边界", "技术可行性评估"],
    "数据": ["数据策略", "指标设计"],
    "沟通": ["跨团队协作", "技术翻译"],
}
\`\`\`

## 推荐学习资源

### 在线课程

| 平台 | 课程 | 适合阶段 |
|------|------|---------|
| DeepLearning.AI | AI for Everyone | L1 |
| DeepLearning.AI | Machine Learning Specialization | L1-L2 |
| fast.ai | Practical Deep Learning | L2 |
| Stanford CS224N | NLP with Deep Learning | L2-L3 |
| Stanford CS231N | CNN for Visual Recognition | L2-L3 |

### 开源项目实践

\`\`\`python
# 推荐参与的开源项目
recommended_projects = [
    "LangChain — LLM 应用开发框架",
    "LlamaIndex — 数据框架 for LLM",
    "Ollama — 本地运行大模型",
    "Hugging Face Transformers — 模型库",
    "vLLM — 高效 LLM 推理引擎",
    "AutoGen — 多 Agent 框架",
]
\`\`\`

## 制定个人学习计划

\`\`\`python
# 个人学习计划模板
personal_plan = {
    "短期目标（1-3个月）": {
        "目标": "完成 L1 阶段学习",
        "具体行动": [
            "每天学习 30 分钟",
            "完成所有实践任务",
            "阅读 3 篇 AI 相关文章",
        ],
        "衡量标准": "完成 15 天学习内容",
    },
    "中期目标（3-6个月）": {
        "目标": "进入 L2 阶段",
        "具体行动": [
            "学习 PyTorch 框架",
            "完成 2 个 AI 项目",
            "参加 1 次 AI 比赛",
        ],
        "衡量标准": "有 2 个可展示的项目",
    },
    "长期目标（6-12个月）": {
        "目标": "具备 AI 工程师能力",
        "具体行动": [
            "深入一个专业方向",
            "参与开源项目",
            "建立个人技术品牌",
        ],
        "衡量标准": "获得 AI 相关岗位 offer",
    },
}
\`\`\`

## 课程总结

恭喜你完成了第一单元到第三单元的学习！回顾一下你的成就：

### 知识体系
- AI/ML/DL 的核心概念
- Python 数据科学工具链
- LLM、Agent、多模态 AI 前沿
- AI 伦理与安全意识

### 实践技能
- NumPy 数值计算
- Pandas 数据处理
- 数据可视化
- Scikit-learn 机器学习
- LLM API 调用

### 下一步行动
1. 坚持每日学习习惯
2. 动手完成所有实践任务
3. 关注 AI 领域最新动态
4. 加入 AI 学习社区
5. 开始构建个人项目

> **记住：AI 学习是一场马拉松，不是短跑。保持好奇心，坚持实践，你一定能成为优秀的 AI 从业者！**
`,
          practice_task: '制定你个人的 AI 学习计划：1) 评估你当前的技能水平；2) 设定 3 个月、6 个月、12 个月的学习目标；3) 列出具体的学习资源；4) 规划每周的学习时间安排；5) 设定可衡量的里程碑。',
          estimated_minutes: 30,
          status: 'locked',
          completion_rate: 0,
        },
      ],
    },
  ],
}
