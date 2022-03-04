<template>
  <Layout>
    <main id="main-content">
      <HeroSection />
      <PostsList />
      <ProjectsGrid />
      <GithubProjects />
    </main>
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
  data: () => ({
    SEO: {
      description:
        "I'm a Software Engineer that crafts things for the Web, heavy focused on front-end development enthusiastic and fascinated on UI design",
    },
  }),
  metaInfo() {
    return {
      title: this.$page.metadata.siteName,
      meta: [
        {
          name: 'description',
          content: this.SEO.description,
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: this.$page.metadata.siteName },
        { property: 'og:description', content: this.SEO.description },
        { property: 'og:url', content: this.$page.metadata.siteUrl },
        {
          property: 'twitter:title',
          content: this.$page.metadata.siteName,
        },
        {
          property: 'twitter:description',
          content: this.SEO.description,
        },
      ],
    }
  },
}
</script>

<page-query>
query {
  metadata {
    siteName
    siteUrl
  }
}
</page-query>
