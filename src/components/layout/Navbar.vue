<template>
  <header class="header">
    <div class="container">
      <g-link to="/">
        <h3>Jeferson Brito</h3>
      </g-link>
      <nav class="navbar">
        <ul class="navbar-menu">
          <li class="navbar-menu__item no-effect">
            <ThemeSwitcher variant="transform" />
          </li>
          <li class="navbar-menu__item">
            <g-link class="navbar-menu__link" to="/articles"> Articles </g-link>
          </li>
          <li class="navbar-menu__item">
            <g-link class="navbar-menu__link" to="/about-me">About</g-link>
          </li>
          <li class="navbar-menu__item">
            <a class="navbar-menu__link" href="/#projects"> Projects </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'

export default {
  components: {
    ThemeSwitcher,
  },
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  height: 60px;
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
  transition-property: font-weight;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
}

.navbar {
  padding: 0.3rem;
}

.navbar .navbar-menu {
  list-style-type: none;
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

  .navbar .navbar-menu li + li {
    margin-left: 0;
  }

  .navbar .navbar-menu .navbar-menu__link {
    letter-spacing: 1px;
    text-transform: initial;
  }

  .navbar .navbar-menu li:active,
  .navbar .navbar-menu li:focus {
    outline-width: 2px;
  }

  .navbar .navbar-menu li.no-effect {
    padding-right: 0;
  }

  svg.animated {
    left: 12px;
  }
}
</style>
