<template>
  <header class="header">
    <div class="container">
      <g-link to="/">
        <h3>Jeferson Brito</h3>
      </g-link>
      <nav class="navbar">
        <ul class="navbar-menu">
          <li>
            <a class="navbar-menu__link">
              Posts
            </a>
          </li>
          <li>
            <a class="navbar-menu__link">About</a>
          </li>
          <li>
            <a class="navbar-menu__link">
              Projects
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  height: 60px;
  font-family: var(--font-title);
  border-bottom: 1px solid var(--color-black-800);
  z-index: 1;
}

.header .container {
  align-items: center;
  justify-content: space-between;
}

.header a {
  text-decoration: none;
  color: var(--color-default-white);
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

.navbar .navbar-menu li {
  position: relative;
  z-index: 1;
  padding: 2px 10px;
}

.navbar .navbar-menu li + li {
  margin-left: 30px;
}

.navbar .navbar-menu li::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: -0.25em;
  right: -0.25em;
  background-color: var(--color-primary);
  transform-origin: center right;
  transform: scaleX(0);
  transition: transform 0.2s ease-out;
}

.navbar .navbar-menu li:hover a {
  font-weight: 500;
  cursor: pointer;
}

.navbar .navbar-menu li:hover::before {
  transform: scaleX(1);
  transform-origin: center left;
}

.navbar .navbar-menu li:active,
.navbar .navbar-menu li:focus {
  outline: 3px dashed var(--color-primary);
}

.navbar .navbar-menu li:focus:hover::before,
.navbar .navbar-menu li:active:hover::before {
  transition-duration: 50ms;
  transform: scaleX(0);
  transform-origin: center right;
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
}
</style>
