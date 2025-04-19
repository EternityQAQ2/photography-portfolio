import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import imageRoutes from './routes/images.js';
import { sequelize } from './models/index.js';

const app = express();                       

/* 中间件 */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/uploads', express.static('uploads'));
// 静态托管前端 dist（相对路径指向 frontend/dist）
app.use(express.static('../frontend/dist'));

/* API 路由 */
app.use('/api/images', imageRoutes);

/* 数据库连接并启动服务器 */
await sequelize.authenticate();
await sequelize.sync();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API ready on ${PORT}`));
