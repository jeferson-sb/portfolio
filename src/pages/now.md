---
title: /now
meta:
  - name: description
    content: What it is happening now?
  - name: og:title
    content: /now
  - name: twitter:title
    content: /now
---

<article class="article">

<time class="time">AGO 2023</time>

# What I'm doing now

📖 Currently reading: <em>The Mythical Man-Month</em> from Frederick P. Brooks.

✏️ Learning: Ruby on Rails

📺 Watching: Jujutsu Kaisen Season 2

🎮 Currently playing: <em>Ni no Kuni II: Revenant Kingdom</em>

New post! [Learn to organise your CSS with Cascade Layers](/articles/organise-your-css-with-cascade-layers)

Bonus: If you use neovim/lunarvim make sure to checkout my new colorscheme: [amethyst](https://github.com/jeferson-sb/amethyst)

</article>
<figure>
  <img src="https://media.giphy.com/media/U8wCBLhkjNknS/giphy.gif" alt="gif of the day" />
  <figcaption>(gif from r0llcake)</figcaption>
</figure>

<style scoped>
:global(#app) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.prose {
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;

  width: calc(100% - 2rem);
  margin-left: auto;
  margin-right: auto;
}

.article {
  padding: 2rem 0;
}

.time {
  text-transform: uppercase;
  font-size: var(--text-base);
  letter-spacing: 2px;
  font-family: var(--font-mono);
  color: var(--color-gray-200);
}

.header-anchor {
  opacity: 0;
  position: absolute;
  top: 2px;
  left: -40px;
  transition: opacity 500ms ease-out;
  min-width: 30px;
  min-height: 30px;
}

img {
  object-fit: contain;
  width: min(500px, 100%);
}

figure {
  padding-top: calc(2rem + 1em)
}

figcaption {
  font-style: italic;
  color: var(--color-silver);
}
</style>
