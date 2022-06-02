<template>
  <SkipLink />
  <Navbar />
  <main id="main-content">
    <article class="article">
      <ArticleHeading
        :title="title"
        :tags="tags"
        :crosspostedOn="crosspostedOn"
        :crosspostLink="crosspostLink"
        :datetime="publishedAt"
        :displayDate="formattedDate"
      />
      <ArticleControls :articleUrl="canonicalUrl" />
      <section class="container">
        <div ref="articleBody" class="article-body">
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
              <component
                :is="Component"
                :key="route.path"
                class="article-body-content"
              />
            </transition>
          </router-view>
        </div>
      </section>
    </article>
  </main>
  <Footer />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import lozad from 'lozad'
import config from '@/config/siteconfig.json'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap',
    },
  ],
})
const route = useRoute()

const title = route.meta.frontmatter?.title
const tags = route.meta.frontmatter?.tags.split(',')
const crosspostedOn = route.meta.frontmatter?.crosspostedOn
const crosspostLink = route.meta.frontmatter?.crosspostedLink
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
  const observer = lozad()
  observer.observe()
})
</script>

<style>
.article .container {
  max-width: 100%;
}

.article-body {
  margin: 0 auto;
  font-size: clamp(var(--text-base), 0.9697rem + 0.1294vw, var(--text-lg));
  font-family: var(--font-serif);
}

.article-body-content {
  display: grid;
  grid-template-columns: 1fr min(75ch, 100%) 1fr;
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
}

.article-body-content .header-anchor {
  opacity: 0;
  position: absolute;
  top: 2px;
  left: -40px;
  transition: opacity 500ms ease-out;
  min-width: 30px;
  min-height: 30px;
}

.article-body-content .header-anchor svg {
  max-width: 30px;
  max-height: 30px;
}

.article-body-content .header-anchor::after {
  all: unset;
}

.article-body-content .header-anchor:focus-visible {
  opacity: 1;
}

.article-body-content h2[id],
.article-body-content h3[id],
.article-body-content h4[id],
.article-body-content h5[id] {
  scroll-margin-top: 6ex;
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

.article-body-content ul,
.article-body-content ol {
  margin-block-start: 0;
  padding-inline-start: 20px;
}

.article-body-content ul li::marker,
.article-body-content ol li::marker {
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

p code {
  font-family: var(--font-mono);
  padding: 2px 6px;
  background-color: var(--accent-color-lighter, var(--code-bg-color));
  border-radius: var(--radius-default);
  letter-spacing: -0.5px;
  color: var(--text-color-default);
}

@media screen and (min-width: 1440px) {
  .article-body-content {
    grid-template-columns: 1fr min(85ch, 100%) 1fr;
  }
}

@media screen and (max-width: 768px) {
  .article-body-content {
    padding-left: 18px;
    padding-right: 18px;
  }
}

@media screen and (max-width: 425px) {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
