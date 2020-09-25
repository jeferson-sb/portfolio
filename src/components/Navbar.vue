<template>
  <header :class="showWhiteHeader ? 'header--bg-white' : 'header'">
    <g-link to="/">
      <g-image
        alt="Logo"
        src="~/assets/img/logo-white.svg"
        width="46"
        v-if="!showWhiteHeader"
      />
      <g-image alt="Logo" src="~/assets/img/logo-dark.svg" width="46" v-else />
    </g-link>
    <nav class="navbar">
      <ul id="menu">
        <li>
          <a
            :class="[
              'menu-link',
              {
                isActive:
                  $route.hash === '#Home' || $route.fullPath === '/#Sobre',
              },
            ]"
            href="#Sobre"
            >{{ $t('navbar.about') }}</a
          >
        </li>
        <li>
          <a
            :class="[
              'menu-link',
              {
                isActive:
                  $route.hash === '#Projetos' ||
                  $route.fullPath === '/#Projetos',
              },
            ]"
            href="#Projetos"
            >{{ $t('navbar.projects') }}</a
          >
        </li>
        <li>
          <a
            :class="[
              'menu-link',
              {
                isActive:
                  $route.hash === '#Contato' || $route.fullPath === '/#Contato',
              },
            ]"
            href="#Contato"
            >{{ $t('navbar.contact') }}</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showWhiteHeader: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      this.showWhiteHeader = currentScrollPosition > 500;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  background: transparent;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  height: 80px;
  padding-left: 20px;
  padding-right: 20px;
  transition: all 0.5s ease-in-out;
}

.navbar {
  font-size: 1.2rem;
  padding: 0.3rem;
  padding-bottom: 0.3rem;
  #menu {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover li .menu-link:not(:hover) {
      opacity: 0.5;
    }
  }
  #menu li .menu-link {
    color: var(--color-default-white);
    cursor: pointer;
    padding: 0 1rem;
    font-size: 1.1em;
    transition: opacity 0.5s ease-in-out;
    letter-spacing: 1px;
  }
}

.menu-link.isActive {
  font-weight: 600;
  color: var(--color-primary) !important;
}

.header--bg-white {
  @extend .header;
  background: var(--color-default-white);
  height: 65px;
  box-shadow: 0 4.1px 26.5px rgba(0, 0, 0, 0.04),
    0 33px 212px rgba(0, 0, 0, 0.08);
  #menu li .menu-link {
    color: var(--color-default-black);
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .header {
    padding: 12px;
    justify-content: space-around;
  }
  .navbar {
    padding: 0;
    font-size: var(--text-base);
  }
}
</style>
