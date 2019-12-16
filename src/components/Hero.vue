<template>
  <div class="container hero">
    <h1
      class="hero-heading"
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
    >
      Olá, Eu sou
      <strong>Jeferson Silva</strong>.
    </h1>
    <h2
      class="hero-subheading"
      data-aos="fade-down"
      data-aos-delay="1050"
      data-aos-duration="500"
    >Web Developer • UI Designer</h2>
    <div
      class="hero-icons"
      data-aos="zoom-out"
      data-aos-easing="ease-in-out"
      data-aos-duration="500"
      data-aos-delay="1500"
    >
      <g-link
        to="https://github.com/jeferson-sb"
        class="hero-icons-link"
        aria-label="My Github"
        title="My Github"
      >
        <fa-icon :icon="['fab', 'github']"></fa-icon>
      </g-link>
      <g-link
        to="https://dev.to/jeferson_sb"
        class="hero-icons-link"
        aria-label="My Dev"
        title="My Dev"
      >
        <fa-icon :icon="['fab', 'dev']"></fa-icon>
      </g-link>
      <g-link
        to="https://www.linkedin.com/in/jeferson-silva-brito-aa0937159/"
        class="hero-icons-link"
        aria-label="My LinkedIn"
        title="My LinkedIn"
      >
        <fa-icon :icon="['fab', 'linkedin']"></fa-icon>
      </g-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/_vars.scss";

.hero-heading {
  font-size: 4rem;
  color: $white;
  strong {
    color: $primary-color;
  }
}
.hero-subheading {
  color: $white;
  font-weight: 500;
}

.hero-icons {
  .hero-icons-link {
    color: $gray;
    padding: 0.4rem;
    font-size: 2em;
    transition: color 0.5s ease;
    &:hover {
      color: $primary-color;
    }
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .hero {
    text-align: center;
  }
  .hero-heading {
    font-size: 2rem;
  }
  .hero-subheading {
    font-size: 1rem;
  }
}
</style>
