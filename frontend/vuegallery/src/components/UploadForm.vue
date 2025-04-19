<script setup>
import { ref } from 'vue';
import api from '../api';

const file = ref(null);
const title = ref('');

async function save() {
  const form = new FormData();
  form.append('file', file.value);
  form.append('title', title.value);

  await api.post('/images', form);   // 会自动带 multipart/form-data
  location.reload();                 // 简单刷新; 也可用 emit 通知父组件刷新
}
</script>

<template>
  <form @submit.prevent="save" class="space-y-4">
    <input v-model="title" placeholder="标题" required class="input" />
    <input type="file" @change="e => file.value = e.target.files[0]" required class="input" />
    <button class="btn">上传</button>
  </form>
</template>
