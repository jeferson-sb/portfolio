<template>
  <header class="header">
    <g-link to="/">
      <g-image
        alt="Logo"
        src="~/assets/img/logo-white.svg"
        width="46"
        v-if="$route.hash === '#Home' || $route.fullPath === '/'"
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
                'isDark':
                  $route.fullPath !== '/' && $route.fullPath !== '/#Home'
              }
            ]"
            href="#Sobre"
          >Sobre</a>
        </li>
        <li>
          <a
            :class="[
              'menu-link',
              {
                'isDark':
                  $route.fullPath !== '/' && $route.fullPath !== '/#Home'
              }
            ]"
            href="#Projetos"
          >Projetos</a>
        </li>
        <li>
          <a
            :class="[
              'menu-link',
              {
                'isDark':
                  $route.fullPath !== '/' && $route.fullPath !== '/#Home'
              }
            ]"
            href="#Contato"
          >Contato</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "~/assets/scss/_vars.scss";

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
    color: #fff;
    cursor: pointer;
    padding: 0 1rem;
    font-size: 1.1em;
    transition: opacity 0.5s ease-in-out;
    letter-spacing: 1px;
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .header {
    padding: 12px;
    justify-content: space-around;
  }
  .navbar {
    padding: 0;
    font-size: 16px;
  }
}
</style>
