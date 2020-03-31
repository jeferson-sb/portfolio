<template>
  <div class="container">
    <article class="about">
      <aside
        class="about-aside"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-duration="1000"
      >
        <g-image
          class="about-aside__author"
          src="~/assets/img/me.jpg"
          width="300"
          alt="me"
          quality="100"
        />
        <g-image
          class="icon"
          src="~/assets/img/code.svg"
          alt="code icon"
          data-aos="fade-down"
          data-aos-delay="1200"
        />
        <h3>Jeferson Silva Brito</h3>
      </aside>
      <section class="about-content">
        <h2
          class="hasHeadline"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
          data-aos-delay="500"
        >
          {{ $t('aboutme.about') }}
        </h2>
        <p data-aos="fade-left" data-aos-easing="ease-out" data-aos-delay="700">
          {{ $t('aboutme.desc1') }}
          {{ getAge }} {{ $t('aboutme.desc2') }}
        </p>
        <div
          class="about-skills"
          data-aos="zoom-out"
          data-aos-easing="ease"
          data-aos-delay="1100"
        >
          <g-image src="~/assets/img/skills.png" width="400" alt="My skills" />
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
  margin-top: 40px;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  .about-aside img.about-aside__author {
    margin-left: 80px;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.1);
  }
  .about-aside img.icon {
    position: absolute;
    top: 60%;
    left: 1%;
    width: 8vw;
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

@media screen and (min-width: $mobile-breakpoint) and (max-width: $tablet-breakpoint) {
  .about {
    img.about-aside__author {
      max-width: 60%;
    }
    .about-aside img.icon {
      top: 50%;
      left: 15%;
      width: 5vw;
    }
    .about-content {
      h2 {
        font-size: 2.5rem;
      }
      p {
        font-size: 1rem;
      }
    }
    .about-skills img {
      max-width: 70%;
    }
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .about {
    grid-template-columns: 1fr;
    .about-aside img.about-aside__author {
      width: 40%;
      border-radius: 50%;
      margin: 0 auto;
    }
    .about-content h2 {
      font-size: 2rem;
    }
    .about-aside img.icon {
      left: 9%;
      top: 74%;
      width: 7vw;
    }
  }
}
</style>
