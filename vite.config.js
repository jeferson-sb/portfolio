/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import { VitePWA } from 'vite-plugin-pwa'
import Vql from 'vite-plugin-vue-gql'
import Shiki from 'markdown-it-shiki'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItAnchor from 'markdown-it-anchor'
import matter from 'gray-matter'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@content': `${path.resolve(__dirname, 'content')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      extensions: ['vue', 'md'],
      dirs: ['src/pages', { dir: 'content/articles', baseRoute: 'articles' }],
      exclude: ['**/draft/*'],
      extendRoute(route, _parent) {
        const isArticlePost =
          route.path.includes('/articles') && route.path !== '/articles'
        const componentPath = path.resolve(__dirname, route.component.slice(1))

        if (isArticlePost) {
          const md = fs.readFileSync(componentPath, 'utf-8')
          const { data: frontmatter } = matter(md)

          return {
            ...route,
            meta: { layout: 'article', frontmatter },
          }
        }

        return route
      },
    }),

    Layouts(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/head'],
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Vql(),
    Markdown({
      wrapperClasses: 'prose',
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Shiki, {
          theme: 'one-dark-pro',
        })
        md.use(MarkdownItAttrs)
        md.use(MarkdownItAnchor, {
          permalink: MarkdownItAnchor.permalink.linkInsideHeader({
            symbol: `
              <span class="sr-only">Jump to heading</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            `,
            placement: 'before',
          }),
        })
      },
    }),

    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*{js,css,html,txt,ico,png,svg}'],
      },
    }),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/head'],
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
})
