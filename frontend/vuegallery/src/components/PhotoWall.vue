<template>
    <section class="max-w-screen-xl mx-auto py-8">
      <div v-if="loading" class="py-16 text-center text-gray-500">加载中...</div>
  
      <div v-else class="columns-1 sm:columns-2 lg:columns-3 gap-2 space-y-2">
        <a
          v-for="img in images"
          :key="img.id"
          :href="img.url"
          data-fancybox="gallery"
          class="block overflow-hidden rounded-xl"
        >
          <img
            :src="img.url"
            :alt="img.title || ''"
            class="w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import api from '../api.js'
  import { Fancybox } from '@fancyapps/ui'
  import '@fancyapps/ui/dist/fancybox/fancybox.css'
  
  const images = ref([])
  const loading = ref(true)
  
  onMounted(async () => {
    try {
      const { data } = await api.get('/images')
      images.value = data
      await nextTick()
      Fancybox.bind('[data-fancybox="gallery"]', {
        groupAll: true,
        Thumbs: { autoStart: false }
      })
    } finally {
      loading.value = false
    }
  })
  </script>
  