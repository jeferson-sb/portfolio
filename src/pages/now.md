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

<time class="time">OCT 2023</time>

# What I'm doing now

📖 Currently reading: <em>The Rust Programming Language</em> by Steve Klabnik and Carol Nichols.

✏️ Learning: Ruby on Rails and Rust.

📺 Watching: Jujutsu Kaisen Season 2, Rurouni Kenshin and Spy Family.

🎮 Currently playing: <em>Forza Motorsport</em> and <em>Starfield</em>.

New post! [Mixing colors in CSS](/articles/css-color-mix)

</article>
<figure>
  <img src="https://media.giphy.com/media/hq7O4BvUNmjLicWaST/giphy.gif" alt="gif of the day" />
  <figcaption>(gif from @theline)</figcaption>
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