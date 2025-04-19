import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api':     'http://localhost:3000', // 你已有
      '/uploads': 'http://localhost:3000', // ★ 新增：静态文件也代理
    },
  },
})