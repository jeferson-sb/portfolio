<template>
  <div class="container">
    <article class="about">
      <aside
        class="about-aside"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
      >
        <g-image src="~/assets/img/me.jpg" width="300" alt="me" quality="100" />
        <h3>Jeferson Silva Brito</h3>
      </aside>
      <section class="about-content">
        <h2
          class="hasHeadline"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
          data-aos-delay="500"
        >
          Sobre mim
        </h2>
        <p data-aos="fade-left" data-aos-easing="ease-out" data-aos-delay="700">
          Sou desenvolvedor web, tenho
          {{ getAge }} anos, graduando em Análise e Desenvolvimento de sistemas,
          apaixonado por novas tecnologias, especialmente JavaScript, Python e
          UI / UX Design. Atualmente trabalho como FullStack Developer.
        </p>
        <div
          class="about-skills"
          data-aos="zoom-out"
          data-aos-easing="ease"
          data-aos-delay="1100"
        >
          <g-image src="~/assets/img/skills.png" width="400" />
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      birthday: '1999-04-18'
    };
  },
  computed: {
    getAge() {
      const birthday = +new Date(this.birthday);
      return ~~((Date.now() - birthday) / 31557600000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_vars.scss';

.about {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  .about-aside img {
    margin: 0 auto;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
  }
  .about-aside h3 {
    padding: 1em;
    color: #a3a3a3;
    font-weight: 400;
    text-align: center;
  }
  .about-content h2 {
    font-size: 3rem;
    margin-bottom: 30px;
    color: $primary-color;
  }
  .about-content p {
    font-size: 1.1rem;
    line-height: 1.5;
    color: $black;
  }
  .about-skills img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    user-select: none;
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .about {
    grid-template-columns: 1fr;
    .about-aside img {
      width: 40%;
      border-radius: 50%;
    }
    .about-content h2 {
      font-size: 2rem;
    }
  }
}
</style>
