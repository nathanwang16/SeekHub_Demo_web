const express = require('express');
const cors = require('cors');
const { Translate } = require('@google-cloud/translate').v2;
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件设置
app.use(cors());
app.use(express.json());

// Google Cloud 配置
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

// 初始化Google Cloud服务
let translate, storage;

try {
  // Google Translate客户端
  translate = new Translate({
    projectId: projectId,
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE // 服务账户密钥文件路径
  });

  // Google Cloud Storage客户端
  storage = new Storage({
    projectId: projectId,
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE
  });

  console.log('Google Cloud 服务初始化成功');
} catch (error) {
  console.log('Google Cloud 服务初始化失败:', error.message);
  console.log('请确保已设置正确的环境变量和服务账户密钥');
}

// 基本路由
app.get('/', (req, res) => {
  res.json({ 
    message: '后端服务器运行正常',
    status: 'success',
    googleCloud: translate ? '已连接' : '未连接'
  });
});

// 翻译API路由
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLanguage = 'en' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: '请提供要翻译的文本' });
    }

    if (!translate) {
      return res.status(500).json({ error: 'Google Translate 服务未初始化' });
    }

    const [translation] = await translate.translate(text, targetLanguage);
    
    res.json({
      originalText: text,
      translatedText: translation,
      targetLanguage: targetLanguage,
      status: 'success'
    });
  } catch (error) {
    console.error('翻译错误:', error);
    res.status(500).json({ error: '翻译失败: ' + error.message });
  }
});

// 获取支持的语言列表
app.get('/api/languages', async (req, res) => {
  try {
    if (!translate) {
      return res.status(500).json({ error: 'Google Translate 服务未初始化' });
    }

    const [languages] = await translate.getLanguages();
    res.json({ languages, status: 'success' });
  } catch (error) {
    console.error('获取语言列表错误:', error);
    res.status(500).json({ error: '获取语言列表失败: ' + error.message });
  }
});

// 文件上传到Google Cloud Storage
app.post('/api/upload', async (req, res) => {
  try {
    if (!storage) {
      return res.status(500).json({ error: 'Google Cloud Storage 服务未初始化' });
    }

    // 这里可以添加文件上传逻辑
    res.json({ message: '文件上传功能待实现', status: 'success' });
  } catch (error) {
    console.error('文件上传错误:', error);
    res.status(500).json({ error: '文件上传失败: ' + error.message });
  }
});

// 健康检查路由
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    googleCloud: {
      translate: !!translate,
      storage: !!storage
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`后端服务器运行在端口 ${PORT}`);
  console.log(`访问 http://localhost:${PORT} 查看服务状态`);
});

module.exports = app; 