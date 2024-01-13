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

<time class="time">JAN 2024</time>

# What I'm doing now

📖 Currently reading: <em>The Rust Programming Language</em> by Steve Klabnik and Carol Nichols. 🦀

✏️ Learning: Rust.

📺 Watching: Sousou no Frieren.

🎮 Currently playing: <em>Persona 3</em>.

Happy new year! 🥳🚀

Excited to bring more content and start new projects this year, stay tuned!

</article>

<video src="@/assets/clip.mp4" height="300" autoplay loop muted />

<style scoped>
.prose {
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;

  width: calc(100% - 2rem);
  margin-inline: auto;
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
  padding-block-start: calc(2rem + 1em)
}

figcaption {
  font-style: italic;
  color: var(--color-silver);
}
</style>
