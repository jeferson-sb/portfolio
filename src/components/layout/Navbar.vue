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
          <li class="navbar-menu__item no-effect is-mobile-only">
            <HamburgerMenu aria-controls="mobile-menu" @click="showMenu" />
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

<script>
export default {
  methods: {
    showMenu() {
      const button = document.querySelector('.hamburger-menu')
      const menu = document.querySelector('.mobile-navbar')

      button.classList.toggle('hamburger-menu--active')
      menu.classList.toggle('mobile-navbar--opened')

      const isActive = button.classList.contains('hamburger-menu--active')
      button.setAttribute('aria-expanded', isActive)
    },
  },
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
  border-bottom: 1px solid var(--color-gray-800);
  z-index: 1;
}

.header .container {
  align-items: center;
  justify-content: space-between;
}

.header a {
  color: var(--text-color-default);
  transition: font-weight 200ms ease-out;
}

.header ul {
  list-style-type: none;
}

.navbar {
  padding: 0.3rem;
}

.navbar .navbar-menu {
  display: flex;
  align-items: center;
}

.navbar .navbar-menu .navbar-menu__link {
  letter-spacing: 1.2px;
  font-weight: 700;
  text-transform: uppercase;
}

.navbar .navbar-menu .navbar-menu__item {
  position: relative;
  z-index: 1;
  padding: 2px 10px;
}

.navbar .navbar-menu .navbar-menu__item + .navbar-menu__item {
  margin-left: 30px;
}

.navbar .navbar-menu .navbar-menu__item:not(.no-effect)::before {
  content: '';
  position: absolute;
  z-index: -1;
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

.navbar .navbar-menu .navbar-menu__item:not(.no-effect):hover::before {
  transform: scale(100%);
}

.navbar .navbar-menu .navbar-menu__item .navbar-menu__link {
  outline: 0;
}

.navbar .navbar-menu .navbar-menu__item:hover .navbar-menu__link {
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.navbar .navbar-menu .navbar-menu__item:active:not(.no-effect),
.navbar .navbar-menu .navbar-menu__item:focus:not(.no-effect),
.navbar .navbar-menu .navbar-menu__item:focus-within:not(.no-effect) {
  outline: 3px dashed var(--color-primary);
}

body[data-theme='light'] .header {
  background-color: transparent;
}

@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .header {
    background-color: rgba(26, 28, 31, 0.3);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }
}

@media screen and (max-width: 1024px) {
  .container {
    padding: 18px;
  }

  .header {
    font-size: var(--text-base);
  }
}

@media screen and (max-width: 425px) {
  .header {
    font-size: var(--text-sm);
    line-height: 1.25rem;
  }

  .navbar .navbar-menu .navbar-menu__item + .navbar-menu__item {
    margin-left: 20px;
  }

  .navbar-menu .navbar-menu__item:nth-child(n + 3) {
    display: none;
  }
}
</style>
