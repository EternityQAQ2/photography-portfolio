import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

import imageRoutes from './routes/images.js'
import { sequelize } from './models/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// 中间件
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({limit: '30mb'} ))

// 静态托管上传文件
app.use('/uploads', express.static('uploads'));


// ✅ 修正路径统一为 vuegallery/dist
//const frontendDist = path.join(__dirname, '../../frontend/vuegallery/dist')

// 静态托管打包后的前端
//app.use(express.static(frontendDist))

// 后端 API
app.use('/api/images', imageRoutes)

// fallback 到 index.html（确保和静态目录一致）
// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(frontendDist, 'index.html'));
// });

const mainAppDist = path.join(__dirname, '../frontend/vuegallery/dist'); // 根据实际路径调整
app.use(express.static(mainAppDist));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(mainAppDist, 'index.html'));
});

// 启动数据库 + 启动服务
await sequelize.authenticate()
await sequelize.sync()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ API ready on http://localhost:${PORT}`))
