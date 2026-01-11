<template>
  <div class="container">
    <ParticlesBackground :quantity="100" :staticity="10" :ease="100" :vx="0" :vy="0" />
    <main id="main-content">
      <article class="about-content">
        <picture>
          <img src="@/assets/img/style_profile.png" alt="me" loading="lazy" />
        </picture>
        <h1 class="about-content__headline">About me</h1>

        <p>
          👋 Hey! How are you?
          I'm Jeferson. I'm a
          <strong>software engineer</strong> dedicated to
          <em> crafting </em> things for the web through coding.
        </p>
        <p>
          I wrote my first lines of code back in 2014 of HTML4, CSS and ES5
          using just a notepad in a very low-end machine 😅. Like many people I
          graduated a few years later and since then I've been on this adventure
          into the world of programming.
        </p>
        <p>
          I don't have "favorites", but I like to code on TypeScript, Elixir, Lua, and I'm starting to tinker with Rust.
          I also like to think outside coding, such as prioritizing tasks/features, doing reviews, modeling and
          providing the good
          practices, fundamentals, and consistency throughout the code.
        </p>
        <p>I've worked on websites (both front-end, back-end), CLI's, and most recently mobile development (React
          Native).</p>
        <p>Personally, I'm into computers, ui design, games and anime (of course) :P</p>
      </article>
      <SocialMediaIcons boxed />
    </main>
  </div>
</template>

<script setup>
import config from '../config/siteconfig.json'

const title = 'About me • Jeferson S. Brito'
const { description } = config
const route = useRoute()

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: `${config.siteUrl}${route.path}` },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
  ],
})
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<style lang="css" scoped>
.container {
  flex-flow: row wrap;
  padding: 3rem 0;
  gap: 2.4rem;
}

.about-content {
  margin-block-end: 2rem;

  & picture {
    float: left;
    shape-outside: ellipse(50% 50%);
    margin: 0 1.125rem 0 0;
    position: relative;

    & img {
      max-width: 140px;
      clip-path: circle(70px at center);
      object-fit: cover;
    }

    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 155px;
      height: 155px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
      outline: 3px inset var(--color-silver);
      border-radius: 9999px;
      will-change: transform;
    }
  }

  & .about-content__headline {
    font-size: var(--text-2xl);
  }

  & p {
    font-size: var(--text-lg);
    opacity: 0.8;
    max-width: 71ch;
    margin-top: 0.50em;
  }
}

.binary-text-svg {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  position: absolute;
  left: 282px;
  top: 387px;
  opacity: 0.3;

  & :deep(tspan) {
    --text-delay: 500ms;

    opacity: 0;
    animation: pulse-spread 3s var(--text-delay) ease-out infinite alternate;

    &:nth-child(1) {
      --text-delay: 500ms;
    }

    &:nth-child(2) {
      --text-delay: 1s;
    }

    &:nth-child(3) {
      --text-delay: 1.5s;
    }

    &:nth-child(4) {
      --text-delay: 2s;
    }

    &:nth-child(5) {
      --text-delay: 2.5s;
    }

    &:nth-child(6) {
      --text-delay: 3s;
    }
  }
}

@keyframes pulse-spread {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.3;
  }
}

@media screen and (min-width: 26.625em) and (max-width: 48em) {
  aside {
    margin-inline-start: 40px;
    padding: 0 2.4rem 0 0;
  }
}

@media (--vw-sm) {
  aside {
    padding: 0 1rem;
  }

  .container {
    height: 100%;
  }

  .binary-text-svg {
    top: 50%;
    left: 0;
    bottom: 0;
  }
}
</style>
