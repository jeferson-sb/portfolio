<template>
  <Layout>
    <HeroSection />
    <PostsList />
    <ProjectsGrid />
    <GithubProjects />
  </Layout>
</template>

<script>
import HeroSection from '@/components/hero/HeroSection.vue'
import PostsList from '@/components/posts/PostsList.vue'
import ProjectsGrid from '@/components/projects/ProjectsGrid.vue'
import GithubProjects from '@/components/github/GithubProjects.vue'

export default {
  components: {
    HeroSection,
    PostsList,
    ProjectsGrid,
    GithubProjects,
  },
}
</script>
