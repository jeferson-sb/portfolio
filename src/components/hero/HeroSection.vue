<template>
  <section class="hero container">
    <aside class="hero-aside">
      <ScrollIndicator class="is-mobile-only" />
      <HeroAvatar>
        <img
src="@/assets/img/profile.jpg" alt="me" class="hero-avatar__image" width="140" height="140"
          loading="lazy" />
      </HeroAvatar>
    </aside>
    <div class="hero-content">
      <h1 class="hero__headline">Jeferson Brito</h1>
      <p class="hero__description">
        Fullstack Engineer, based in Sao Paulo 🇧🇷
      </p>
      <p class="hero__description">
        OSS, UI/UX, a11y, and backend systems. JS/TS, Elixir, Ruby, Rust and Lua.
      </p>
      <SocialMediaIcons />
    </div>
  </section>
</template>

<style scoped>
.hero {
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
}

.hero__headline {
  font-size: clamp(var(--text-base), 1vw + var(--text-lg), var(--text-xl));
  font-weight: var(--fw-bold);
  margin-block-end: 0.25rem;
}

.hero__description {
  font-size: clamp(var(--text-sm), 1vw + var(--text-base), var(--text-lg));
  color: var(--color-silver-600);
  &:last-of-type {
    margin-block-end: 1rem;
  }
}

.hero-aside {
  display: flex;
  justify-self: end;
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
