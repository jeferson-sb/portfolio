<template>
  <Layout>
    <HeroSection />
    <PostsList />
    <ProjectsGrid />
  </Layout>
</template>

<script>
import HeroSection from '@/components/hero/HeroSection.vue'
import PostsList from '@/components/posts/PostsList.vue'
import ProjectsGrid from '@/components/projects/ProjectsGrid.vue'

export default {
  components: {
    HeroSection,
    PostsList,
    ProjectsGrid,
  },
}
</script>
