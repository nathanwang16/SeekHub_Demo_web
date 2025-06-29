# 后端API服务器

这是一个连接Google Cloud服务的Node.js后端服务器，支持Google Translate和Google Cloud Storage功能。

## 功能特性

- ✅ Express.js 服务器
- ✅ Google Cloud Translate API 集成
- ✅ Google Cloud Storage 集成
- ✅ CORS 支持
- ✅ 错误处理
- ✅ 健康检查端点

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置Google Cloud

#### 2.1 创建Google Cloud项目
1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 记录项目ID

#### 2.2 启用必要的API
在Google Cloud Console中启用以下API：
- Google Cloud Translation API
- Google Cloud Storage API

#### 2.3 创建服务账户
1. 前往 IAM & Admin > Service Accounts
2. 点击 "Create Service Account"
3. 填写服务账户详情
4. 为服务账户分配角色：
   - Cloud Translation API User
   - Storage Admin (如果使用存储功能)
5. 创建JSON密钥文件并下载

### 3. 环境配置

1. 复制配置示例文件：
```bash
cp config.example.env .env
```

2. 编辑 `.env` 文件，填入你的配置：
```env
PORT=3001
GOOGLE_CLOUD_PROJECT_ID=your-actual-project-id
GOOGLE_CLOUD_KEY_FILE=./path/to/your-service-account-key.json
```

3. 将下载的服务账户JSON密钥文件放到项目目录中，并更新`.env`文件中的路径。

### 4. 启动服务器

```bash
npm start
```

或开发模式（需要安装nodemon）：
```bash
npm run dev
```

## API 端点

### 基本信息
- `GET /` - 服务器状态和Google Cloud连接状态
- `GET /health` - 健康检查

### 翻译功能
- `POST /api/translate` - 翻译文本
  ```json
  {
    "text": "Hello, world!",
    "targetLanguage": "zh-CN"
  }
  ```

- `GET /api/languages` - 获取支持的语言列表

### 存储功能
- `POST /api/upload` - 文件上传（待实现）

## 项目结构

```
backend/
├── server.js              # 主服务器文件
├── package.json           # 项目依赖
├── config.example.env     # 环境变量示例
├── README.md             # 说明文档
└── node_modules/         # 依赖包
```

## 环境变量说明

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `PORT` | 否 | 服务器端口，默认3001 |
| `GOOGLE_CLOUD_PROJECT_ID` | 是 | Google Cloud项目ID |
| `GOOGLE_CLOUD_KEY_FILE` | 是 | 服务账户密钥文件路径 |
| `GOOGLE_CLOUD_REGION` | 否 | Google Cloud区域 |
| `GOOGLE_CLOUD_STORAGE_BUCKET` | 否 | 存储桶名称 |

## 故障排除

### 常见问题

1. **Google Cloud服务初始化失败**
   - 检查项目ID是否正确
   - 确认服务账户密钥文件路径正确
   - 验证API是否已启用

2. **翻译API报错**
   - 确认Translation API已启用
   - 检查服务账户权限
   - 验证配额是否充足

3. **CORS错误**
   - 确认前端URL已添加到CORS配置中

### 日志查看

服务器启动时会显示：
```
后端服务器运行在端口 3001
访问 http://localhost:3001 查看服务状态
Google Cloud 服务初始化成功
```

## 开发指南

### 添加新的API端点

1. 在 `server.js` 中添加新的路由
2. 实现相应的处理逻辑
3. 添加错误处理
4. 更新文档

### 数据库集成

如需添加数据库支持，推荐使用：
- MongoDB (with Mongoose)
- PostgreSQL (with Sequelize)
- MySQL (with Sequelize)

### 部署

推荐部署平台：
- Google Cloud Run
- Vercel
- Railway
- Heroku

## 支持

如有问题，请检查：
1. 环境变量是否正确配置
2. Google Cloud API是否启用
3. 服务账户权限是否充足
4. 网络连接是否正常 