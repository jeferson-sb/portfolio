<template>
  <header class="header">
    <div class="container">
      <router-link to="/">
        <h3>Jeferson Brito</h3>
      </router-link>
      <nav class="navbar">
        <ul class="navbar-menu">
          <li class="navbar-menu__item no-effect">
            <ThemeSwitcher variant="transform" />
          </li>
          <li class="navbar-menu__item no-effect">
            <HamburgerMenu aria-controls="mobile-menu" @toggle="toggleMenu" />
          </li>
          <li class="navbar-menu__item">
            <router-link class="navbar-menu__link" to="/articles">
              Articles
            </router-link>
          </li>
          <li class="navbar-menu__item">
            <router-link class="navbar-menu__link" to="/about-me"
              >About</router-link
            >
          </li>
          <li class="navbar-menu__item">
            <router-link class="navbar-menu__link" to="/#projects">
              Projects
            </router-link>
          </li>
          <li class="navbar-menu__item">
            <router-link class="navbar-menu__link" to="/now">
              /now
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <MobileNavbar>
      <li class="navbar-menu__item">
        <router-link class="navbar-menu__link" to="/articles">
          Articles
        </router-link>
      </li>
      <li class="navbar-menu__item">
        <router-link class="navbar-menu__link" to="/about-me"
          >About</router-link
        >
      </li>
      <li class="navbar-menu__item">
        <router-link class="navbar-menu__link" to="/#projects">
          Projects
        </router-link>
      </li>
      <li class="navbar-menu__item">
        <router-link class="navbar-menu__link" to="/now"> /now </router-link>
      </li>
    </MobileNavbar>
  </header>
</template>

<script setup>
const toggleMenu = () => {
  const button = document.querySelector('.hamburger-menu')
  const menu = document.querySelector('.mobile-navbar')

  button.classList.toggle('hamburger-menu--active')
  menu.classList.toggle('mobile-navbar--opened')

  const isActive = button.classList.contains('hamburger-menu--active')
  button.setAttribute('aria-expanded', isActive)
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  min-height: 60px;
  font-family: var(--font-title);
  border-bottom: 1px solid hsla(214, 9%, 15%, 0.2);
  z-index: var(--z-base);
  & .container {
    align-items: center;
    justify-content: space-between;
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

.navbar-menu__link {
  letter-spacing: 1.2px;
  font-weight: var(--fw-bold);
  text-transform: uppercase;
}

.navbar-menu .navbar-menu__item {
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
    background: radial-gradient(
      circle at bottom,
      rgba(26, 188, 209, 0.603) 5%,
      rgba(0, 0, 0, 0) 60%
    );
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

  &:focus-visible:not(.no-effect),
  &:focus-within:not(.no-effect) {
    outline: 2px dashed var(--color-primary);
  }
}

.navbar-menu .navbar-menu__item + .navbar-menu__item {
  margin-inline-start: 30px;
}

.navbar-menu__link {
  outline: 0;
}

body[data-theme='light'] {
  .header {
    background-color: transparent;
  }
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .header {
    background-color: rgba(26, 28, 31, 0.3);
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
  .container {
    padding: 18px;
  }

  .header {
    font-size: var(--text-base);
  }
  .navbar-menu { 
    & .navbar-menu__item:nth-child(n + 3) {
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
    & .navbar-menu__item + .navbar-menu__item {
      margin-inline-start: 1.25rem;
    }
  }
}
</style>
