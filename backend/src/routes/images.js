import express from 'express';
import multer  from 'multer';
import path    from 'path';
import { Image } from '../models/Image.js';
//import { upload } from '../server.js'  // 或自己 export upload

const router = express.Router();

/* ① 配置 Multer：文件名保持唯一 */
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads'),
  filename: (_, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage,
  limits: { fileSize: 30 * 1024 * 1024 } // 允许上传 30MB 的文件
 });

/* ② 列表 */
router.get('/', async (_, res) => {
    try {
      const list = await Image.findAll({ order: [['id', 'DESC']] });
      res.json(list);
    } catch (err) {
      console.error('⛔  Image.findAll error →', err.parent?.sqlMessage || err.message);
      console.error('⛔  Raw SQL →', err.sql);          // 有时在 err.parent.sql
      res.status(500).json({ message: err.message });
    }
  });

/* ③ 上传并写数据库 */
router.post('/', upload.single('file'), async (req, res) => {
  const img = await Image.create({
    title: req.body.title || '',
    description: req.body.description || '',
    url: `/uploads/${req.file.filename}`,      // 存相对 URL
  });
  res.status(201).json(img);
});

export default router;
