<script setup>
import { useHead } from '@vueuse/head'
import config from '@/config/siteconfig.json'

useHead({
  title: config.siteName,
  meta: [{ name: 'description', content: config.description }],
})
</script>

<template>
  <router-view />
</template>
