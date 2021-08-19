<template>
  <Layout>
    <div class="container">
      <aside>
        <HeroAvatar>
          <g-image
            src="@/assets/img/profile.jpg"
            alt="me"
            class="hero-avatar__image"
            quality="100"
            width="140"
          />
        </HeroAvatar>
        <BinaryTextSVG />
      </aside>
      <main id="main-content">
        <article class="about-content">
          <h1 class="about-content__headline">About me</h1>
          <p>
            I'm <strong>software developer consultant</strong> focused in
            <em>Front-end Web Developement</em>.
          </p>
          <p>
            I’m a Developer that aim promoting and delivering the best quality
            products. Someone who believes that perseverance, effort and
            determination leads to the best results.
          </p>
          <p>
            I am always focused on proving the
            <strong>
              best practices, fundamentals and consistency through out the code </strong
            >, passionated about the entire JavaScript ecosystem and that loves
            a good experience and delightful user interfaces.
          </p>
          <SocialMediaIcons boxed />
        </article>
      </main>
    </div>
  </Layout>
</template>

<script>
import HeroAvatar from '@/components/hero/HeroAvatar.vue'
import SocialMediaIcons from '@/components/social-media/SocialMediaIcons.vue'
import BinaryTextSVG from '@/assets/svg/binary-text.svg'

export default {
  components: {
    HeroAvatar,
    SocialMediaIcons,
    BinaryTextSVG,
  },
  metaInfo() {
    return {
      title: 'About me',
    }
  },
}
</script>

<style scoped>
#app {
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

.about-content .about-content__headline {
  font-size: var(--text-2xl);
}

.about-content p {
  font-size: var(--text-lg);
  opacity: 0.8;
  max-width: 71ch;
}

.binary-text-svg {
  font-family: monospace;
  font-size: var(--text-xl);
  position: absolute;
  left: 310px;
  top: 280px;
  opacity: 0.3;
}

.binary-text-svg tspan {
  opacity: 0;
  animation-name: pulse-spread;
  animation-duration: 3s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.binary-text-svg tspan:nth-child(1) {
  animation-delay: 500ms;
}

.binary-text-svg tspan:nth-child(2) {
  animation-delay: 1s;
}

.binary-text-svg tspan:nth-child(3) {
  animation-delay: 1.5s;
}

.binary-text-svg tspan:nth-child(4) {
  animation-delay: 2s;
}

.binary-text-svg tspan:nth-child(5) {
  animation-delay: 2.5s;
}

.binary-text-svg tspan:nth-child(6) {
  animation-delay: 3s;
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
