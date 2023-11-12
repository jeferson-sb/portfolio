<template>
  <section class="hero container has-ellipse-curve">
    <div class="hero-content">
      <h1 class="hero__headline">I'm Jeferson Brito</h1>
      <p class="hero__description">
        Software Engineer that crafts things for the Web, heavy focused on
        front-end development enthusiastic and fascinated on UI design ✨
      </p>
      <SocialMediaIcons />
    </div>
    <aside class="hero-aside">
      <ScrollIndicator class="is-mobile-only" />
      <h2 class="hero__subheadline">web developer</h2>
      <HeroAvatar>
        <img
          src="@/assets/img/profile.jpg"
          alt="me"
          class="hero-avatar__image"
          width="140"
          height="140"
          loading="lazy"
        />
      </HeroAvatar>
    </aside>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(50%, 700px) auto;
  align-items: center;
  padding: 3rem 0;
}

.hero__headline {
  font-size: var(--text-3xl);
  font-size: clamp(var(--text-xl), 1vw + var(--text-2xl), var(--text-3xl));
  font-weight: var(--fw-bold);
}

.hero__subheadline {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1em;
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  font-weight: var(--fw-normal);
  writing-mode: vertical-lr;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: var(--color-gray-400);
  margin: 0 1rem;

  &::before,
  &::after {
    content: '';
    border-bottom: 1px solid var(--color-gray-400);
    align-self: center;
    justify-self: center;
    min-width: 24px;
    transform: rotate(90deg);
  }
}

.hero__description {
  font-size: clamp(var(--text-base), 1vw + var(--text-lg), var(--text-xl));
  margin-block-end: 1.5rem;
  color: var(--color-silver-600);
}

.hero-aside {
  display: flex;
  justify-self: end;
  padding: 0 17px;
}

@media screen and (min-width: 64em) {
  .hero {
    &::after {
      content: '';
      background-color: var(--color-gray-600);
      opacity: 0.1;
      position: absolute;
      width: 100%;
      z-index: var(--z-hide);
      left: 0;
      top: 0;
    }
    &.has-ellipse-curve::after {
      content: '';
      clip-path: ellipse(100% 55% at 48% 44%);
      height: calc(500px + 2vw);
    }

    &.has-triangle-down::after {
      clip-path: polygon(50% 63%, 100% 38%, 100% 2%, 0% 1%, 0% 38%);
      height: calc(500px + 3vw);
    }
  }

  body[data-theme='light'] .hero::after {
    content: '';
    background-color: var(--color-gray-300);
  }
}

@media (--vw-lg) {
  .hero-avatar {
    display: none;
  }
}

@media (--vw-sm) {
  .hero {
    height: 100vh;
    height: 100dvh;
    grid-template-columns: 1fr;
  }

  .hero-content {
    text-align: center;
  }

  .hero__headline {
    font-size: calc(var(--text-xl) + 0.75rem);
    letter-spacing: 1.2px;
  }

  .social-media-icons a {
    padding: 8px;
  }

  .social-media-icons a svg {
    max-width: 35px;
  }
}
</style>
