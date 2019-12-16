<template>
  <Layout>
    <section class="section" id="Home">
      <Hero />
    </section>
    <section class="section" id="Sobre">
      <AboutMe />
    </section>
    <section class="section" id="Projetos">
      <ProjectsGrid :projects="$page.projects.edges" />
    </section>
    <section class="section" id="Contato">
      <Contact />
    </section>
  </Layout>
</template>

<page-query>
query Projects{
	projects: allProjectPost {
    edges {
      node {
        id
        title
        type
        thumbnail (quality: 90, width: 300, height: 140)
        demo
        github
      }
    }
  }
}
</page-query>

<script>
import Hero from "@/components/Hero.vue";
import AboutMe from "@/components/AboutMe.vue";
import ProjectsGrid from "@/components/ProjectsGrid.vue";
import Contact from "@/components/Contact.vue";

export default {
  components: {
    Hero,
    AboutMe,
    ProjectsGrid,
    Contact
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/_vars.scss";

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  flex-direction: column;
  padding: 2rem;
}

.section {
  height: 100vh;

  &:nth-of-type(1) {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url("../assets/img/bg-img-02.jpg");
    background-size: cover;
    background-position: center;
    height: 100vh;
    .section-link {
      color: rgba(255, 255, 255, 0.651);
    }
  }
  &:nth-of-type(2) {
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.8)
      ),
      url("../assets/img/bg-img-03.jpg");
    background-size: cover;
    background-position: center;
  }
  &:nth-of-type(4) {
    background-color: #f8f8f8;
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .container {
    align-items: initial;
    height: 100%;
  }
  .section:nth-of-type(1) {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url("../assets/img/bg-img-01.jpg");
    background-size: cover;
    background-position: 40%;
  }
}
</style>
