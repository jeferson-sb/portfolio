<template>
  <Layout>
    <main>
      <article class="article">
        <div class="article-heading">
          <h1>{{ $page.article.title }}</h1>
          <p class="article-info">
            <time :datetime="$page.article.published_at">
              {{ formattedDate }}
            </time>
            <TagGroup :tags="$page.article.tag_list" />
          </p>
        </div>
        <section class="container">
          <div
            ref="articleBody"
            class="article-body"
            v-html="$page.article.parsed_markdown"
          ></div>
        </section>
      </article>
    </main>
  </Layout>
</template>

<script>
import TagGroup from '@/components/ui/TagGroup'
import '@/assets/styles/prism-onedark.css'

export default {
  components: {
    TagGroup,
  },
  metaInfo() {
    return {
      title: this.$page.article.title,
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap',
        },
        {
          rel: 'canonical',
          href: this.$page.article.canonical_url,
        },
      ],
      meta: [
        {
          property: 'og:title',
          content: this.$page.article.title,
        },
        {
          property: 'og:description',
          content: this.$page.article.description,
        },
        {
          property: 'og:url',
          content: `https://jefersonsilva.me/articles/${this.$page.article.slug}`,
        },
        {
          name: 'twitter:title',
          content: this.$page.article.title,
        },
        {
          name: 'twitter:description',
          content: this.$page.article.description,
        },
        {
          name: 'description',
          content: this.$page.article.description,
        },
      ],
    }
  },
  mounted() {
    const headings = Array.from(
      this.$refs.articleBody.querySelectorAll('a span.icon')
    )
    this.addLinkToHeading(headings)
  },
  computed: {
    formattedDate() {
      return new Date(this.$page.article.published_at).toLocaleString(
        ['en-US'],
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }
      )
    },
    linkSVG() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      `
    },
  },
  methods: {
    addLinkToHeading(array) {
      array.forEach((heading, index) => {
        heading.insertAdjacentHTML('afterBegin', this.linkSVG)
      })
    },
  },
}
</script>

<page-query>
query Article ($path: String) {
  article: articles (path: $path) {
    title
    published_at
    tag_list
    parsed_markdown
    slug
    description
    canonical_url
  }
}
</page-query>

<style>
.article-heading {
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  padding: calc(2vw + 85px) calc(1vw + 385px);
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

.article-body {
  margin: 0 auto;
  font-size: clamp(var(--text-base), 0.9697rem + 0.1294vw, var(--text-lg));
  max-width: 75ch;
  font-family: var(--font-serif);
}

.article-body h2,
.article-body h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-body h2 {
  font-size: calc(var(--text-xl) + 0.5vw);
}

.article-body h3 {
  font-size: calc(var(--text-lg) + 0.3vw);
}

.article-body h4 {
  font-size: calc(var(--text-base) + 0.2vw);
}

.article-body h5 {
  font-size: calc(var(--text-sm) + 0.1vw);
}

.article-body p {
  margin-bottom: 16px;
}

.article-body a[aria-hidden] {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 2px;
  left: -40px;
  opacity: 0;
  transition: opacity 500ms ease-out;
}

.article-body a[aria-hidden]::after {
  all: unset;
}

.article-body a[aria-hidden] span svg {
  width: 100%;
}

.article-body h2[id],
.article-body h3[id],
.article-body h4[id],
.article-body h5[id] {
  position: relative;
}

.article-body h2[id]:hover a,
.article-body h3[id]:hover a,
.article-body h4[id]:hover a,
.article-body h5[id]:hover a {
  opacity: 1;
}

.article-body code:not([class*='language-']) {
  font-family: var(--font-mono);
  padding: 2px 6px;
  background-color: var(--accent-color-lighter, var(--color-gray-700));
  border-radius: var(--radius-default);
  letter-spacing: -0.5px;
}

.article-body pre {
  border-radius: var(--radius-default);
}

.article-body blockquote {
  border-left: 2px solid var(--color-primary);
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  padding: 1.2rem 2rem;
  border-radius: var(--radius-default);
}

.article-body blockquote p {
  margin: 0;
  opacity: 0.8;
}

.article-body img {
  border-radius: var(--radius-default);
  margin: 10px 0 2rem;
}

.article-body li + li {
  margin-top: 7px;
}

.article-body hr {
  margin: 2rem 0;
  opacity: 0.5;
  border-color: var(--color-silver);
}

.article-body a {
  position: relative;
  text-decoration: none;
}

.article-body a::after {
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

.article-body a:hover::after {
  opacity: 1;
  transform: translateY(0);
}

@media screen and (min-width: 1440px) {
  .article-body {
    max-width: 100ch;
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
    padding-left: 18px;
    padding-right: 18px;
    max-width: 100%;
  }

  .article-body p {
    text-align: justify;
    white-space: break-spaces;
    hyphens: none;
    -moz-hyphens: none;
  }
}
</style>
