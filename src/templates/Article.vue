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
      ],
    }
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
  }
}
</page-query>

<style>
.article-heading {
  background-color: var(--color-light, var(--color-black-800));
  padding: calc(2vw + 85px) calc(1vw + 385px);
  max-height: 340px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  text-align: center;
}

body[data-theme='light'] .article-heading {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
}

.article-heading h1 {
  font-family: var(--font-title);
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
  font-family: var(--font-title);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-body h2 {
  font-size: calc(var(--text-xl) + 0.5vw);
}

.article-body h3 {
  font-size: calc(var(--text-lg) + 0.5vw);
}

.article-body p {
  margin-bottom: 16px;
}

.article-body code:not([class*='language-']) {
  /* load font source sans pro */
  font-family: var(--font-mono);
  padding: 2px 6px;
  background-color: var(--accent-color-lighter, var(--color-black-700));
  border-radius: var(--radius-default);
  letter-spacing: -0.5px;
}

.article-body pre {
  border-radius: var(--radius-default);
}

.article-body blockquote {
  border-left: 2px solid var(--color-primary);
  background-color: var(--accent-color-lighter, var(--color-black-800));
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
}

.article-body a {
  color: var(--color-primary);
  text-decoration: none;
  position: relative;
}

.article-body a:active,
.article-body a:focus {
  outline: 2px dashed var(--color-primary);
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
@media screen and (min-width: 769px) and (max-width: 1024px) {
}
@media screen and (min-width: 426px) and (max-width: 768px) {
}
</style>
