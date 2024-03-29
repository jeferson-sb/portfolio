<template>
  <header class="header">
    <div class="nav">
      <router-link to="/">
        <h3>Jeferson Brito</h3>
      </router-link>
      <nav class="navbar">
        <ul class="navbar-menu">
          <li class="navbar-menu__item">
            <router-link class="navbar-menu__link" to="/articles">
              articles
            </router-link>
          </li>
          <li class="navbar-menu__item">
            <router-link class="navbar-menu__link" to="/about-me">about</router-link>
          </li>
          <li class="navbar-menu__item">
            <router-link class="navbar-menu__link" to="/now">
              /now
            </router-link>
          </li>
          <li class="navbar-menu__item no-effect">
            <HamburgerMenu aria-controls="mobile-menu" @toggle="toggleMenu(true)" />
          </li>
          <li class="navbar-menu__item no-effect">
            <ThemeSwitcher variant="transform" />
          </li>
        </ul>
      </nav>
    </div>
    <MobileNavbar @close="toggleMenu(false)">
      <li class="navbar-menu__item">
        <router-link class="navbar-menu__link" to="/articles">
          /articles
        </router-link>
      </li>
      <li class="navbar-menu__item">
        <router-link class="navbar-menu__link" to="/about-me">/about</router-link>
      </li>
      <li class="navbar-menu__item">
        <router-link class="navbar-menu__link" to="/now"> /now </router-link>
      </li>
    </MobileNavbar>
  </header>
</template>

<script setup>
const toggleMenu = (open) => {
  const button = document.querySelector('.hamburger-menu')
  const menu = document.querySelector('.mobile-navbar')

  if (open) {
    button.classList.add('hamburger-menu--active')
    menu.classList.add('mobile-navbar--opened')
    button.setAttribute('aria-expanded', true)
  } else {
    menu.classList.remove('mobile-navbar--opened')
    button.classList.remove('hamburger-menu--active')
    button.setAttribute('aria-expanded', false)
  }
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  font-family: var(--font-title);
  z-index: var(--z-base);
  border: 1px solid hsla(214, 9%, 25%, 0.2);

  & .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;

    width: calc(100% - 2rem);
    max-width: 1110px;
    margin-inline: auto;
    padding-inline: 2rem;
    border-end-start-radius: 1rem;
    border-end-end-radius: 1rem;
  }

  & a {
    color: var(--text-color-default);
    transition: font-weight 200ms ease-out;
  }

  & ul {
    list-style-type: none;
  }
}

.navbar {
  padding: 0.3rem;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-menu:has(:hover) .navbar-menu__item:not(:hover) {
  opacity: 0.7;
}

.navbar-menu__link {
  letter-spacing: 1.2px;
}

.navbar-menu .navbar-menu__item {
  transition: opacity 400ms ease-out;
  position: relative;
  z-index: var(--z-base);
  padding: 2px 10px;

  &:not(.no-effect)::before {
    content: '';
    position: absolute;
    z-index: var(--z-hide);
    top: 15px;
    bottom: 0;
    left: 0;
    background: radial-gradient(circle at bottom,
        rgba(26, 188, 209, 0.603) 5%,
        rgba(0, 0, 0, 0) 60%);
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-out;
    transform: scale(0);
    transform-origin: bottom;
  }

  &:not(.no-effect):hover::before {
    transform: scale(100%);
  }

  &:hover .navbar-menu__link {
    font-weight: var(--fw-normal);
    cursor: pointer;
    text-decoration: none;
  }

  &+.navbar-menu__item {
    margin-inline-start: 18px;
  }
}

.navbar-menu .navbar-menu__item+.navbar-menu__item {
  margin-inline-start: 30px;
}

.navbar-menu .navbar-menu__item+.navbar-menu__item {
  margin-inline-start: 30px;
}

.navbar-menu__link {
  outline: 0;

  &:focus-visible {
    outline: 2px dashed var(--color-primary);
    outline-offset: 10px;
  }
}

body[data-theme='light'] {
  .header {
    background-color: transparent;
  }

  .nav {
    background-color: hsl(216deg 9% 83% / 30%);
  }
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .nav {
    background-color: hsl(216deg 8.77% 11.18% / 30%);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }
}

@media screen and (min-width: 48em) {
  .hamburger-menu {
    display: none;
  }
}

@media (--vw-md) {
  .header {
    font-size: var(--text-base);

    & .nav {
      padding: 0;
    }
  }

  .navbar-menu {
    & .navbar-menu__item:has(a) {
      display: none;
    }
  }
}

@media (--vw-sm) {
  .header {
    font-size: var(--text-sm);
    line-height: 1.25rem;
  }

  .navbar-menu {
    & .navbar-menu__item+.navbar-menu__item {
      margin-inline-start: 1.25rem;
    }
  }
}
</style>
