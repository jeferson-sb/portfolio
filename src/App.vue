<script setup>
import { useHead } from '@vueuse/head'
import config from '@/config/siteconfig.json'

useHead({
  title: config.siteName,
  meta: [
    { name: 'description', content: config.description },
    {
      name: 'google-site-verification',
      content: import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_TOKEN,
    },
  ],
})
</script>

<template>
  <router-view />
</template>
