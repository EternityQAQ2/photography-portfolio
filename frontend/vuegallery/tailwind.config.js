/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  /* 1️⃣ 让 Tailwind 扫描到所有模板文件 */
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  /* 2️⃣ 启用 class 暗黑模式（和你原版 index.html 保持一致） */
  darkMode: 'class',

  theme: {
    extend: {
      /* 3️⃣ 把 Google Fonts 加进来：Nothing You Could Do 与 Signika */
      fontFamily: {
        nothingyoucoulddo: ["'Nothing You Could Do'", ...defaultTheme.fontFamily.cursive],
        signika: ["'Signika'", ...defaultTheme.fontFamily.sans],
      },

      /* 4️⃣ 自定义 keyframes + animation，复刻原来 .animate-fade-in */
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
      },
    },
  },

  /* 5️⃣ 常用官方插件（可按需删减） */
  plugins: [
    require('@tailwindcss/forms'),        // <form> 样式优化
    require('@tailwindcss/typography'),   // Prose 类（博客/文章排版）
    require('@tailwindcss/aspect-ratio'), // aspect-square / aspect-video…
  ],
}
