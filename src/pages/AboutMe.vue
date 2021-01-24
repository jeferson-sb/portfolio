<template>
  <Layout>
    <div class="container">
      <aside>
        <HeroAvatar>
          <g-image
            src="@/assets/img/me.jpg"
            alt="me"
            class="hero-avatar__image"
            quality="100"
            width="140"
          />
        </HeroAvatar>
        <BinaryTextSVG />
      </aside>
      <main>
        <article class="about-content">
          <h2 class="about-content__headline">About me</h2>
          <p>
            I'm software developer consultant focused in Front-end Web
            Developement.
          </p>
          <p>
            I’m Developer that aim promoting and delivering the best quality
            products. Someone who believes that perseverance, effort and
            determination leads to the best results.
          </p>
          <p>
            I am always focused on proving the best practices, fundamentals and
            consistency through out the code, passionated about the entire
            JavaScript ecosystem and that loves a good experience and delightful
            user interfaces.
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
}
</script>

<style scoped>
.container {
  flex-flow: row wrap;
  padding: 3rem 0;
  height: calc(100vh - 168px);
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

@media screen and (max-width: 765px) {
  aside {
    padding: 0 2.4rem;
  }
}

@media screen and (min-width: 426px) and (max-width: 768px) {
  aside {
    margin-left: 40px;
  }
}

@media screen and (max-width: 425px) {
  .container {
    height: 100%;
  }

  .binary-text-svg {
    top: auto;
    left: 210px;
    bottom: -90px;
  }
}
</style>
