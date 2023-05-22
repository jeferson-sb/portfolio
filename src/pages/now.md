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

<time class="time">May 2023</time>

# What I'm doing now

I'm currently reading: <em>A Mind for Numbers</em>.

I've recently published the second post of Component Drive UI Patterns, make sure to check it out! [Component Drive UI Patterns II](/articles/component-driven-design-part-2)

Watching Dr. Stone season 3 📺

Currently playing <em>Ni no Kuni Wrath of the White Witch</em>🎮

<img src="https://media.giphy.com/media/9GIyktt76WotG/giphy.gif" alt="gif of the day" />
</article>

<style scoped>
:global(#app) {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article {
  width: min(100ch, 100% - 2rem);
  margin-left: auto;
  margin-right: auto;
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
  width: min(400px, 100%);
}
</style>
