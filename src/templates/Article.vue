<template>
  <Layout>
    <main>
      <article class="article">
        <div class="article-heading">
          <h1>{{ article.title }}</h1>
          <p class="article-info">
            <time :datetime="article.published_at">
              {{ formattedDate }}
            </time>
            <span
              class="article-source"
              v-if="article.crosspostedOn && article.crosspostLink"
            >
              Originally posted on
              <a
                :href="article.crosspostLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ article.crosspostedOn }}
              </a>
            </span>
            <TagGroup :tags="tags" />
          </p>
        </div>
        <section class="container">
          <div ref="articleBody" class="article-body">
            <VueRemarkContent class="article-body-content" />
          </div>
        </section>
      </article>
    </main>
  </Layout>
</template>

<script>
import lozad from 'lozad'
import TagGroup from '@/components/ui/TagGroup'

export default {
  components: {
    TagGroup,
  },
  metaInfo() {
    return {
      title: this.article.title,
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap',
        },
        {
          rel: 'canonical',
          href: this.canonicalUrl,
        },
      ],
      meta: [
        {
          property: 'og:title',
          content: this.article.title,
        },
        {
          property: 'og:description',
          content: this.article.excerpt,
        },
        {
          property: 'og:url',
          content: this.canonicalUrl,
        },
        {
          name: 'twitter:title',
          content: this.article.title,
        },
        {
          name: 'twitter:description',
          content: this.article.excerpt,
        },
        {
          name: 'description',
          content: this.article.excerpt,
        },
      ],
    }
  },
  computed: {
    article() {
      return {
        ...this.$page.article,
      }
    },
    formattedDate() {
      return new Date(this.article.published_at).toLocaleString(['en-US'], {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    },
    canonicalUrl() {
      return this.article.canonicalUrl
        ? this.article.canonicalUrl
        : `${this.$page.site.siteUrl}${this.article.path}`
    },
    tags() {
      return this.article.tags.split(',')
    },
  },
  updated() {
    const observer = lozad()
    observer.observe()
  },
}
</script>

<page-query>
query Article ($path: String) {
  article: articles (path: $path) {
    path
    title
    published_at
    tags
    excerpt
    crosspostedOn
    crosspostLink
    canonicalUrl
  }
  site: metadata {
    siteUrl
  }
}
</page-query>

<style>
.article-heading {
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  padding: calc(2vw + 85px) calc(1vw + 200px);
  max-height: 340px;
  box-shadow: var(--elevation-2);
  text-align: center;
}

body[data-theme='light'] .article-heading {
  box-shadow: var(--elevation-3);
}

.article-heading h1 {
  font-size: clamp(var(--text-lg), 1vw + var(--text-xl), var(--text-2xl));
}

.article-info {
  display: flex;
  flex-flow: row wrap;
  opacity: 0.7;
  justify-content: center;
}

.article-info .tags {
  margin: 0;
}

.article-info time {
  margin-right: 9px;
}

.article-info .article-source {
  margin-right: 9px;
  padding-left: 9px;
  border-left: 1px solid var(--text-color-default);
}

.article .container {
  max-width: 100%;
}

.article-body {
  font-size: clamp(var(--text-base), 0.9697rem + 0.1294vw, var(--text-lg));
  margin: 0 auto;
  font-family: var(--font-serif);
}

/* Markdown content */

.article-body-content {
  display: grid;
  grid-template-columns: 1fr min(85ch, 100%) 1fr;
}

.article-body-content > * {
  grid-column: 2;
}

.article-body-content .full-bleed {
  width: 100%;
  grid-column: 1 / -1;
  max-height: 60vh;
  object-fit: cover;
}

.article-body-content h2,
.article-body-content h3 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.article-body-content h2 {
  font-size: calc(var(--text-xl) + 0.5vw);
}

.article-body-content h3 {
  font-size: calc(var(--text-lg) + 0.3vw);
}

.article-body-content h4 {
  font-size: calc(var(--text-base) + 0.2vw);
}

.article-body-content h5 {
  font-size: calc(var(--text-sm) + 0.1vw);
}

.article-body-content p {
  margin-bottom: 16px;
  word-break: break-word;
}

.article-body-content a[aria-hidden] {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 2px;
  left: -40px;
  opacity: 0;
  transition: opacity 500ms ease-out;
}

.article-body-content a[aria-hidden]:focus-visible {
  opacity: 1;
}

.article-body-content a[aria-hidden]::after {
  all: unset;
}

.article-body-content a[aria-hidden] span {
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjMWFiYmQxIj4KICA8cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTEzLjgyOCAxMC4xNzJhNCA0IDAgMDAtNS42NTYgMGwtNCA0YTQgNCAwIDEwNS42NTYgNS42NTZsMS4xMDItMS4xMDFtLS43NTgtNC44OTlhNCA0IDAgMDA1LjY1NiAwbDQtNGE0IDQgMCAwMC01LjY1Ni01LjY1NmwtMS4xIDEuMSIgLz4KPC9zdmc+Cg==');
  display: inline-block;
  width: 30px;
  height: 30px;
}

.article-body-content h2[id],
.article-body-content h3[id],
.article-body-content h4[id],
.article-body-content h5[id] {
  position: relative;
}

.article-body-content h2[id]:hover a,
.article-body-content h3[id]:hover a,
.article-body-content h4[id]:hover a,
.article-body-content h5[id]:hover a {
  opacity: 1;
}

.article-body-content blockquote {
  border-left: 2px solid var(--color-primary);
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  padding: 1.2rem 2rem;
  border-radius: var(--radius-default);
  margin-bottom: 1rem;
}

.article-body-content blockquote p {
  margin: 0;
  opacity: 0.8;
}

.article-body-content blockquote p em {
  color: var(--text-color-default);
}

.article-body-content img {
  border-radius: var(--radius-default);
  margin: 10px 0 2rem;
}

.article-body-content ul {
  margin-block-start: 0;
  padding-inline-start: 20px;
}

.article-body-content ul li::marker {
  color: var(--color-silver);
}

.article-body-content li + li {
  margin-top: 7px;
}

.article-body-content hr {
  margin: 2rem 0;
  opacity: 0.5;
  border-color: var(--color-silver);
}

.article-body-content a {
  position: relative;
  text-decoration: none;
}

.article-body-content a::after {
  content: '';
  position: absolute;
  height: 2px;
  width: 100%;
  left: 0;
  bottom: 0;
  opacity: 0;
  transform: translateY(3px);
  background: var(--color-primary);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.article-body-content a:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.article-body-content em {
  color: var(--color-accent);
}

.article-body-content kbd {
  padding: 3px 5px;
  vertical-align: middle;
  background-color: var(--color-default-white);
  color: var(--color-default-black);
  box-shadow: inset 0 -2px 0 var(--color-gray-400);
  border-radius: var(--radius-default);
  border-bottom: var(--color-gray-400);
  font-size: var(--text-sm);
}

/* Code syntax highlight */

.article-body-content code[class*='language-text'] {
  font-family: var(--font-mono);
  padding: 2px 6px;
  background-color: var(--accent-color-lighter, var(--color-gray-700));
  border-radius: var(--radius-default);
  letter-spacing: -0.5px;
  color: var(--text-color-default);
}

.article-body-content pre {
  border-radius: var(--radius-default);
}

.gridsome-highlight {
  border-radius: var(--radius-default);
  margin-bottom: 0.5em;
  overflow: auto;
  background: var(--code-bg-color);
}

.gridsome-highlight-code-line {
  display: block;
  margin-left: -0.5rem;
  margin-right: 0;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid var(--color-primary);
  background-color: var(--code-highlight-color);
}

.gridsome-highlight pre[class*='language-'] {
  padding: 0;
  overflow: initial;
  min-width: 100%;
}

.gridsome-highlight pre[class*='language-'].line-numbers {
  padding-left: 2.8em;
}

.gridsome-highlight pre[class*='language-'].line-numbers .line-numbers-rows {
  padding-left: 10px;
  border-right: 1px solid var(--color-gray-700);
}

.gridsome-code-title {
  background-color: var(--code-bg-color);
  border-bottom: 1px solid var(--color-gray-700);
  text-align: center;
  padding: 0.4rem 0;
}

.gridsome-code-title span {
  color: var(--color-gray-300);
}

.gridsome-code-title + .gridsome-highlight {
  border-radius: 0 0 var(--radius-default);
}

.gridsome-highlight ::selection {
  color: unset !important;
  background: rgba(0, 0, 0, 0.3) !important;
}

@media screen and (min-width: 1440px) {
  .article-body-content {
    display: grid;
    grid-template-columns: 1fr min(100ch, 100%) 1fr;
  }
}

@media screen and (max-width: 768px) {
  .article-body-content {
    padding-left: 18px;
    padding-right: 18px;
  }
}

@media screen and (max-width: 425px) {
  .article-heading {
    padding: 20px;
    text-align: left;
  }

  .article-heading h1 {
    margin-bottom: 2vw;
  }

  .article-info {
    justify-content: unset;
  }

  .article-info time {
    flex-basis: 100%;
    margin-bottom: 7px;
  }

  .article-body {
    max-width: 100%;
  }

  .article-body-content {
    padding-left: 18px;
    padding-right: 18px;
    grid-template-columns: 1fr;
  }

  .article-body-content > * {
    grid-column: 1;
  }

  .article-body-content p {
    line-height: 1.7;
  }
}
</style>
