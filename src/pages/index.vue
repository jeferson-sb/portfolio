<template>
  <main id="main-content">
    <HeroSection />
    <PostsList />
    <ProjectsGrid />
    <GithubProjects />
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import lozad from 'lozad'
import { useRoute } from 'vue-router'
import config from '@/config/siteconfig.json'

const { siteName: title } = config
const { description } = config

const route = useRoute()

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: `${config.siteUrl}${route.path}` },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
  ],
})

onMounted(() => {
  const observer = lozad()
  observer.observe()
})
</script>
