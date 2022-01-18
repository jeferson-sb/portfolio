module.exports = {
  siteName: 'Software Engineer',
  siteUrl: `https://jefersonsilva.me`,
  titleTemplate: '%s • Jeferson S. Brito',
  icon: './static/favicon.png',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/projects/**/*.md',
        typeName: 'Projects',
        resolveAbsolutePaths: true,
      },
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Articles',
        baseDir: './content/articles',
        template: './src/templates/Article.vue',
        route: '/articles/:slug',
        ignore: ['draft/**/*'],
        plugins: [
          'remark-attr',
          [
            'gridsome-plugin-remark-prismjs-all',
            {
              showLineNumbers: true,
            },
          ],
        ],
      },
    },
    {
      use: '@gridsome/source-graphql',
      options: {
        url: 'https://api.github.com/graphql',
        fieldName: 'userInfo',
        typeName: 'User',
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
    {
      use: 'gridsome-plugin-gtag',
      options: {
        config: {
          id: process.env.GOOGLE_ANALYTICS_ID,
        },
      },
    },
    {
      use: 'gridsome-plugin-svg',
    },
    {
      use: 'gridsome-plugin-pwa',
      options: {
        disableServiceWorker: false,
        serviceWorkerPath: 'service-worker.js',
        cachedFileTypes: 'js,json,css,html,png,jpg,jpeg,svg,gif',
        disableTemplatedUrls: false,
        manifestPath: 'manifest.json',
        title: "Jeferson's Portfolio",
        startUrl: '/',
        icon: 'static/favicon.png',
        display: 'standalone',
        orientation: 'landscape',
        statusBarStyle: 'default',
        themeColor: '#1A1C1F',
        backgroundColor: '#1ABBD1',
        shortName: 'JB',
        description:
          "I'm Jeferson a Software Engineer that crafts things for the Web, heavy focused on front-end development with a boiling taste of UI design",
        msTileColor: '#1A1C1F',
        appleMaskIconColor: '#1A1C1F',
      },
    },
  ],
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        'remark-attr',
        [
          'gridsome-plugin-remark-prismjs-all',
          {
            showLineNumbers: true,
          },
        ],
      ],
    },
  },
}
