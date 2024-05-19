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

<time class="time">MAY 2024</time>

# What I'm doing now

📖 Currently reading: <em>Domain Modeling Made Functional</em> by Scott Wlaschin.

✏️ Learning: Rust.

📺 Watching: Demon Slayer.

🎮 Currently playing: <em>Sea of Stars</em>.

Latest article: [/articles/how-to-keep-up](/articles/how-to-keep-up)

</article>

<video src="@/assets/clip.mp4" height="300" autoplay loop muted />

<style scoped>
body[data-theme='light'] {
  .prose {
    &::before,
    &::after {
      --background: var(--light);
    }
  }

  .time { 
    color: var(--color-gray-400);
  }
}

.prose {
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  position: relative;

  width: calc(100% - 2rem);
  margin-inline: auto;
  padding-block: 4rem;
}

.prose::after {
  --dark: var(--color-gray-800);
  --light: var(--color-gray-100);

  content: "";
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  background-image: radial-gradient(circle at 2px 2px, var(--background, var(--dark)) 1px, transparent 0);
  background-size: 20px 20px;
  z-index: -10;
}

.prose::before {
  --dark: hsl(216deg 9% 11% / 90%);
  --light: hsl(228deg 33% 97% / 90%);

  content: "";
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  background: linear-gradient(to bottom, var(--background, var(--dark)) 0%, transparent 50%, var(--background, var(--dark)) 90%);
  z-index: -1;
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

video { 
  border-radius: 1rem;
  box-shadow: 0 0 20px 0px 0 0 20px 0px hsl(226deg 24% 62% / 25%);
}
</style>
