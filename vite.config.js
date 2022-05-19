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
import Prism from 'markdown-it-prism'
import MarkdownItAttrs from 'markdown-it-attrs'
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
        md.use(Prism, {
          plugins: ['line-highlight', 'line-numbers'],
        })
        md.use(MarkdownItAttrs)
      },
    }),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: "Jeferson's Portfolio",
        short_name: 'JB',
        theme_color: '#1A1C1F',
        background_color: '#1ABBD1',
        lang: 'en-us',
        description:
          "I'm a Software Engineer that crafts things for the Web, heavy focused on front-end development enthusiastic and fascinated on UI design",
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
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
