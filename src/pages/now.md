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

<time class="time">Apr 2023</time>

# What I'm doing now

I'm currently reading two technical books: <em>Refactoring: Improving the Design of Existing Code</em> and <em>Programming Lua</em>.

I'm developing a toy project for listing upcoming tech conferences with Next.js, tRPC, and Prisma.

I've been writing a few posts as well, one of them I released a couple of days ago: [Component Driven UI Patterns](/articles/component-driven-design), which is the first of a series I'm elaborating about components and how to understand their patterns.

Tinkering a bit with [LunarVIM](https://www.lunarvim.org/), which caught my interest as I began learning Lua in the last couple of months, and I'm planning to build a little theme with it.

Excited to the new season of Spring Anime! 📺 

As for games, I currently playing <em>Ni no Kuni Wrath of the White Witch</em>🎮

<img src="https://media.giphy.com/media/yALcFbrKshfoY/giphy.gif" alt="gif of the day" />
  

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
