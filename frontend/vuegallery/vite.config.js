import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/gallery/',   // ✅ 添加这一行：部署子路径
  plugins: [vue()],
  build: {
    // ✅ outDir 推荐保持为相对路径，方便部署
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',     // API 接口代理
      '/uploads': 'http://localhost:3000', // 静态图片代理
    },
  },
})
