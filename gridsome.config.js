module.exports = {
  siteName: 'Front-end Developer & UI Designer',
  siteUrl: `https://jefersonsilva.me`,
  titleTemplate: '%s • Jeferson S. Brito',
  siteDescription:
    "I'm a Software Developer Consultant focused in Front-end Web Development",
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'projects/**/*.md',
        typeName: 'Projects',
        resolveAbsolutePaths: true,
      },
    },
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Articles',
        baseDir: './articles',
        template: './src/templates/Article.vue',
        route: '/articles/:slug',
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
      use: 'gridsome-plugin-svg',
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
