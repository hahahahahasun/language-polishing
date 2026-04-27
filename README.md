# 人话翻译机 🖊️

把 AI 味赶走，留下你自己的声音。

## 项目结构

```
humanizer/
├── index.html        ← 用户界面
├── config.js         ← ✏️ 你的配置文件（改这里定制工具）
├── api/
│   └── rewrite.js    ← 后端 API（保护密钥）
└── vercel.json       ← Vercel 配置
```

## 部署步骤（5 分钟）

### 第一步：上传到 GitHub
1. 打开 https://github.com，注册/登录
2. 点击右上角 "+" → "New repository"
3. 仓库名随便起，选 Public，点 "Create repository"
4. 把这个文件夹里所有文件拖进去上传

### 第二步：部署到 Vercel
1. 打开 https://vercel.com，用 GitHub 账号登录
2. 点 "Add New Project"
3. 选择你刚创建的 GitHub 仓库
4. 点 "Deploy"（先不用管任何设置）

### 第三步：设置 API 密钥
1. 部署完成后，进入项目 → "Settings" → "Environment Variables"
2. 添加一个变量：
   - Name: `ANTHROPIC_API_KEY`
   - Value: 你的 Anthropic API 密钥（从 https://console.anthropic.com 获取）
3. 点 Save，然后回到 "Deployments" 重新部署一次

完成！你会得到一个 `xxx.vercel.app` 的公开链接，任何人都可以访问。

## 如何定制

打开 `config.js` 文件，你可以修改：

- `SITE_NAME` — 网站名称
- `SITE_TAGLINE` — 副标题
- `MODES` — 改写模式，修改 `label`（名称）、`description`（说明）、`prompt`（AI 指令）
- `FOOTER_TEXT` — 页脚文字

修改后重新上传到 GitHub，Vercel 会自动重新部署。

## 获取 API 密钥

1. 访问 https://console.anthropic.com
2. 注册账号
3. 进入 "API Keys" → "Create Key"
4. 复制密钥，填入 Vercel 环境变量
