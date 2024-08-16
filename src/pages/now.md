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

<time class="time">AUG 2024</time>

# Current Status

I'm currently reading: <em>Moonwalking with Einstein</em> by Joshua Foer.

My latest post about Web Rendering patterns is out, make sure to check out [here](/articles/understanding-the-wild-world-of-web-rendering-patterns) and grab some coffee.

If you have suggestions or wish I write about any other topic, [feel free to submit here](https://forms.gle/ftUPgfqW7ghzQgTY9).

📺 Watching: Nier Automata Anime.

🎮 Currently playing: RPG <em>No Rest for the Wicked</em>.

</article>

<figure>
  <img src="https://media1.tenor.com/m/JyyXt2zMOpsAAAAC/2b.gif" height="500" alt="gif of the day" />
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
</style>
