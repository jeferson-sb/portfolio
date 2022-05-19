<template>
  <div class="container">
    <aside>
      <HeroAvatar>
        <img
          src="@/assets/img/profile.jpg"
          alt="me"
          width="140"
          loading="lazy"
        />
      </HeroAvatar>
      <BinaryTextSVG />
    </aside>
    <main id="main-content">
      <article class="about-content">
        <h1 class="about-content__headline">About me</h1>
        <p>👋 Hey! How are you?</p>
        <p>
          I'm Jeferson. I'm a
          <strong>software engineer</strong> dedicated to
          <em> crafting </em> things for the web through coding.
        </p>
        <p>
          I wrote my first lines of code back in 2014 of HTML4, CSS and ES5
          using just a notepad in a very low machine 😅. Like many people I
          graduated a few years later and since then I've been on this adventure
          into the world of programming.
        </p>
        <p>
          I don't have "favorites", but I like to code on JavaScript,
          Typescript, Python, and Elixir at the moment. I also like to think
          outside coding, prioritizing tasks/features, and proving the best
          practices, fundamentals, and consistency throughout the code.
        </p>
        <p>I'm into computers, ui design, games and anime (of course) :P</p>
        <SocialMediaIcons boxed />
      </article>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
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
:global(#app) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.container {
  flex-flow: row wrap;
  padding: 3rem 0;
}

main {
  padding: 1.2rem 2.4rem;
}

.about-content {
  .about-content__headline {
    font-size: var(--text-2xl);
  }

  p {
    font-size: var(--text-lg);
    opacity: 0.8;
    max-width: 71ch;
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

@media screen and (min-width: 426px) and (max-width: 768px) {
  aside {
    margin-left: 40px;
    padding: 0 2.4rem 0 0;
  }
}

@media screen and (max-width: 425px) {
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
