<template>
  <div class="container hero">
    <h1
      class="hero-heading"
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
      data-aos-duration="800"
    >
      {{ $t('title') }}
      <strong>Jeferson Silva</strong>.
    </h1>
    <h2
      class="hero-subheading"
      data-aos="fade-down"
      data-aos-delay="1000"
      data-aos-duration="600"
    >
      Web Developer • UI Designer
    </h2>
    <div
      class="hero-icons"
      data-aos="zoom-out"
      data-aos-easing="ease-in-out"
      data-aos-duration="500"
      data-aos-delay="1200"
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
        to="https://www.linkedin.com/in/jeferson-sb/"
        class="hero-icons-link"
        aria-label="My LinkedIn"
        title="My LinkedIn"
      >
        <fa-icon :icon="['fab', 'linkedin']"></fa-icon>
      </g-link>
      <g-link
        to="https://dribbble.com/jeferson_sb"
        class="hero-icons-link"
        aria-label="My Dribble"
        title="My Dribble"
      >
        <fa-icon :icon="['fab', 'dribbble-square']"></fa-icon>
      </g-link>
    </div>
    <div id="mouse-scroll" data-aos="fade-down" data-aos-delay="1700">
      <div class="mouse">
        <div class="mouse-in"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~/assets/scss/_vars.scss';

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

#mouse-scroll {
  position: absolute;
  margin: auto;
  left: 50%;
  top: 60%;
  transform: translateX(-50%);
  z-index: 2;
  span {
    display: block;
    width: 5px;
    height: 5px;
    transform: rotate(45deg);
    transform: rotate(45deg);
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    margin: 0 0 3px 5px;
  }
  .mouse {
    height: 51px;
    width: 20px;
    border-radius: 10px;
    transform: none;
    border: 2px solid #ffffff;
    top: 170px;
  }
}

#mouse-scroll .mouse-in {
  height: 9px;
  width: 3px;
  border-radius: 5rem;
  display: block;
  margin: 5px auto;
  background: #ffffff;
  position: relative;
  animation: mouse-animated 2s ease-in-out 0.4s infinite;
}

@keyframes mouse-animated {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
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
  #mouse-scroll {
    top: 70%;
  }
}
</style>
