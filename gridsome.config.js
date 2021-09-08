module.exports = {
  siteName: 'Front-end Developer & UI Designer',
  siteUrl: `https://jefersonsilva.me`,
  titleTemplate: '%s • Jeferson S. Brito',
  siteDescription:
    "I'm a Software Developer Consultant focused in Front-end Web Development",
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
        manifestPath: 'manifest.json',
        title: 'Jeferson S. Brito',
        short_name: 'JB',
        description:
          "I'm a Software Developer Consultant focused in Front-end Web Development",
        startUrl: '/',
        display: 'standalone',
        statusBarStyle: 'default',
        themeColor: '#1abbd1',
        backgroundColor: '#1A1C1F',
        icon: 'static/favicon.png',
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
