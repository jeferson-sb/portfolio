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

<time class="time">AUG 2026</time>

# Current Status

I'm currently reading: <em>Designing Data-Intensive Applications</em> by Martin Kleppmann.

If you have suggestions or wish me to write about any other topic, [feel free to submit here](https://forms.gle/ftUPgfqW7ghzQgTY9).

I'm not really active in social media, but if you want to get in touch:

🌍 Socials:

- Bluesky: [@jeferson-brito.bsky.social](https://bsky.app/profile/jeferson-brito.bsky.social)
- Mastodon: [@jeferson_brito](https://mastodon.social/@jeferson_brito)

I am watching Witch Hat Atelier and playing Nier Replicant.

## Tools I use

<dl class="tools">
  <div class="tool">
    <dt>Drawing</dt>
    <dd><a href="https://tldraw.com">tldraw</a></dd>
  </div>
  <div class="tool">
    <dt>Note taking</dt>
    <dd><a href="https://www.notion.com">Notion</a>, <a href="https://www.onenote.com">OneNote</a></dd>
  </div>
  <div class="tool">
    <dt>Bookmarks</dt>
    <dd><a href="https://raindrop.io">Raindrop</a> extension</dd>
  </div>
  <div class="tool">
    <dt>Terminal</dt>
    <dd><a href="https://www.warp.dev">Warp</a></dd>
  </div>
  <div class="tool">
    <dt>Browser</dt>
    <dd><a href="https://brave.com">Brave</a>, <a href="https://zen-browser.app">Zen</a></dd>
  </div>
  <div class="tool">
    <dt>Code editor</dt>
    <dd><a href="https://neovim.io">Neovim</a>, <a href="https://code.visualstudio.com">VS Code</a></dd>
  </div>
  <div class="tool">
    <dt>Code AI assistant</dt>
    <dd><a href="https://pi.dev">pi.dev</a>, <a href="https://claude.com/claude-code">Claude Code</a></dd>
  </div>
  <div class="tool">
    <dt>API dev</dt>
    <dd><a href="https://www.usebruno.com">Bruno</a></dd>
  </div>
  <div class="tool">
    <dt>Music</dt>
    <dd><a href="https://open.spotify.com">Spotify</a></dd>
  </div>
  <div class="tool">
    <dt>Design</dt>
    <dd><a href="https://figma.com">Figma</a></dd>
  </div>
</dl>

</article>

<figure>
  <img src="https://media1.tenor.com/m/YwH0Fax7R_8AAAAC/sai-dr-stone.gif" alt="gif of the day" />
  <figcaption>(from Tenor)</figcaption>
</figure>

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

  .tools dt {
    color: var(--color-gray-500);
  }
}

.prose {
  --container-size: 1100px;

  position: relative;
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;

  width: min(var(--container-size), 100% - 2rem);
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
  width: min(70ch, 100%);

  & .header-anchor {
    opacity: 0;
    position: absolute;
  }

  & p {
    font-size: var(--text-lg);
  }

  & .time {
    text-transform: uppercase;
    font-size: var(--text-base);
    letter-spacing: 2px;
    font-family: var(--font-mono);
    color: var(--color-gray-200);
  }
}

.tools {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0 2rem;
  margin-block: 0;
}

.tools .tool {
  display: flex;
  flex-flow: column;
  gap: 0.125rem;
  padding-block: 0.75rem;
  border-block-start: var(--border-width) var(--border-style)
    color-mix(in oklch, var(--color-silver) 35%, transparent);
}

.tools dt {
  text-transform: uppercase;
  font-family: var(--font-mono);
  font-size: var(--text-xsm);
  letter-spacing: 1px;
  color: var(--color-gray-400);
}

.tools dd {
  margin-inline-start: 0;
  font-size: var(--text-lg);
}

img {
  object-fit: contain;
  width: min(500px, 100%);
}

figcaption {
  font-style: italic;
  color: var(--color-silver);
}

video {
  border-radius: 1rem;
  box-shadow: 0 0 20px 0px 0 0 20px 0px hsl(226deg 24% 62% / 25%);
}

ul {
  list-style-type: none;
  font-size: var(--text-lg);
}
</style>
