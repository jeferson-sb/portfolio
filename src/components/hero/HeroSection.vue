<template>
  <section class="hero container">
    <div class="hero-content">
      <h1 class="hero__headline">I'm Jeferson Brito</h1>
      <h2 class="hero__subheadline">Web Developer & UI Designer</h2>
      <SocialMediaIcons />
    </div>
    <aside>
      <ScrollIndicator class="is-mobile-only" />
      <HeroAvatar>
        <g-image
          src="@/assets/img/me.jpg"
          alt="me"
          class="hero-avatar__image"
          quality="100"
          width="140"
        />
      </HeroAvatar>
    </aside>
  </section>
</template>

<script>
import ScrollIndicator from '@/components/ui/ScrollIndicator.vue'
import SocialMediaIcons from '@/components/social-media/SocialMediaIcons.vue'
import HeroAvatar from '@/components/hero/HeroAvatar.vue'

export default {
  components: {
    ScrollIndicator,
    SocialMediaIcons,
    HeroAvatar,
  },
}
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(50%, 700px) auto;
  align-items: center;
  padding: 3rem 0;
}

.hero-content {
  font-family: var(--font-title);
}

.hero__headline {
  font-size: var(--text-3xl);
  font-size: clamp(var(--text-xl), 1vw + var(--text-2xl), var(--text-3xl));
  font-weight: 700;
}

.hero__subheadline {
  font-size: var(--text-2xl);
  font-size: clamp(var(--text-lg), 1vw + var(--text-xl), var(--text-2xl));
  opacity: 0.35;
  letter-spacing: 1.2px;
  margin-bottom: 20px;
}

aside {
  justify-self: end;
  padding: 0 17px;
}

@media screen and (max-width: 425px) {
  .hero {
    height: 100vh;
    grid-template-columns: 1fr;
  }

  aside .hero-avatar {
    display: none;
  }

  .hero-content {
    text-align: center;
  }

  .hero__headline {
    font-size: calc(var(--text-xl) + 0.75rem);
    letter-spacing: 1.2px;
  }

  .hero__subheadline {
    font-weight: 500;
    letter-spacing: initial;
    font-size: var(--text-base);
  }

  .social-media-icons a {
    padding: 8px;
  }

  .social-media-icons a svg {
    max-width: 35px;
  }
}

@media screen and (max-width: 1024px) {
  .hero {
    padding-right: 18px;
    padding-left: 18px;
  }
}
</style>
