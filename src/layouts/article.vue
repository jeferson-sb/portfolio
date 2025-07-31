<template>
  <SkipLink />
  <Navbar />
  <main id="main-content">
    <article class="article">
      <ArticleHeading :title="title" :tags="tags" :crossposted-on="crosspostedOn" :crosspost-link="crosspostLink"
        :datetime="publishedAt" :display-date="formattedDate" />
      <section class="article-grid">
        <ArticleControls :article-url="canonicalUrl" :article-id="id" />
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.path" class="article-body-content" />
        </router-view>
      </section>
    </article>
  </main>
  <Footer />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import lozad from 'lozad'
import config from '@/config/siteconfig.json'

const route = useRoute()

useHead({
  meta: [
    {
      name: 'description',
      content: route.meta.frontmatter.excerpt
    },
    {
      property: 'twitter:description',
      content: route.meta.frontmatter.excerpt,
    },
    { property: 'og:description', content: route.meta.frontmatter.excerpt },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: route.meta.frontmatter.og_image },
    {
      name: 'keywords',
      content: route.meta.frontmatter.tags.split(',')
    },
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap',
    },
  ],
})

const id = route.meta.frontmatter?.id
const title = route.meta.frontmatter?.title
const tags = route.meta.frontmatter?.tags.split(',')
const crosspostedOn = route.meta.frontmatter?.crosspostedOn
const crosspostLink = route.meta.frontmatter?.crosspostLink
const publishedAt = route.meta.frontmatter?.published_at
const canonicalUrl = `${config.siteUrl}${route.path}`
const formattedDate = computed(() =>
  new Date(publishedAt).toLocaleString(['en-US'], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
)

onMounted(() => {
  const observer = lozad('.lozad', { threshold: 0.5, })
  observer.observe()
})
</script>

<style>
.article-grid {
  --content-width: 100ch;

  display: grid;
  width: calc(100% - 2rem);
  margin-inline: auto;
  grid-template-columns: 1fr min(var(--content-width), 100%) 1fr;
  justify-items: end;
  gap: 1rem;
  /* kind hacky, but does the job */
  grid-template-rows: 0;
}

.article-body-content .fullbleed {
  width: 100%;
  grid-column: 1 / -1;
}

.article-body-content {
  --content-width: 75ch;

  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid;

  font-size: clamp(var(--text-base), 0.9697rem + 0.1294vw, var(--text-lg));
  font-family: var(--font-serif);

  &>* {
    grid-column: 2;
  }

  & :is(h2, h3) {
    margin-block: 1rem;
  }

  :is(h2, h3, h4, h5):target {
    text-decoration-color: var(--color-silver);
    text-decoration-style: wavy;
    text-decoration-thickness: 2px;
    text-decoration-line: underline;
    text-underline-offset: 10px;
  }

  & h2 {
    font-size: calc(var(--text-xl) + 0.5vw);
  }

  & h3 {
    font-size: calc(var(--text-lg) + 0.3vw);
  }

  & h4 {
    font-size: calc(var(--text-base) + 0.2vw);
  }

  & h5 {
    font-size: calc(var(--text-sm) + 0.1vw);
  }

  & p {
    margin-block-end: 16px;
  }

  & :is(h2[id], h3[id], h4[id], h5[id]) {
    scroll-margin-top: 6ex;
    position: relative;

    &:hover a {
      opacity: 1;
    }
  }

  & em {
    color: var(--color-accent);
  }

  & blockquote {
    border-left: 2px solid var(--color-primary);
    background-color: var(--accent-color-lighter, var(--color-gray-800));
    padding: 1.2rem 2rem;
    border-radius: var(--radius-default);
    margin-block-end: 1rem;

    & p {
      margin: 0;
      opacity: 0.8;
    }

    & p em {
      color: var(--text-color-default);
    }
  }

  & img {
    border-radius: var(--radius-default);
    margin: 10px 0 2rem;
  }

  & :is(ul, ol) {
    margin-block-start: 0;
    padding-inline-start: 20px;

    & li::marker {
      color: var(--color-silver);
    }
  }

  & li+li {
    margin-block-start: 7px;
  }

  & hr {
    margin: 2rem 0;
    opacity: 0.5;
    border-color: var(--color-silver);
  }

  & kbd {
    padding: 3px 5px;
    vertical-align: middle;
    background-color: var(--color-default-white);
    color: var(--color-default-black);
    box-shadow: inset 0 -2px 0 var(--color-gray-400);
    border-radius: var(--radius-default);
    border-bottom: var(--color-gray-400);
    font-size: var(--text-sm);
  }

  & details summary::marker {
    color: var(--color-silver);
  }

  & details summary {
    cursor: pointer;
  }

  & .header-anchor {
    opacity: 0;
    position: absolute;
    top: 2px;
    left: -40px;
    transition: opacity 500ms ease-out;
    min-width: 30px;
    min-height: 30px;

    & svg {
      max-width: 30px;
      max-height: 30px;
    }

    &::after {
      all: unset;
    }

    &:focus-visible {
      opacity: 1;
    }
  }

  & p code,
  & li code {
    font-family: var(--font-mono);
    padding: 2px 6px;
    background-color: var(--accent-color-lighter, var(--code-bg-color));
    border-radius: var(--radius-default);
    letter-spacing: -0.5px;
    color: var(--text-color-default);
  }
}

@media (--vw-md) {
  .article-grid {
    --content-width: 1fr;
    grid-template-rows: auto;
  }
}

@media (--vw-sm) {
  .article-body {
    max-width: 100%;
  }

  .article-body-content {
    & p {
      line-height: 1.7;
    }
  }
}
</style>
