module.exports = {
  siteName: 'Front-end Developer & UI Designer',
  siteUrl: `https://jefersonsilva.me`,
  titleTemplate: '%s • Jeferson S. Brito',
  siteDescription:
    "I'm a Software Developer Consultant focused in Front-end Web Development",
  templates: {
    Articles: [
      {
        path: '/articles/:slug',
        component: './src/templates/Article.vue',
      },
    ],
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'projects/**/*.md',
        typeName: 'Projects',
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
        },
      },
    },
    {
      use: '@chiubaca/gridsome-source-devto',
      options: {
        typeName: 'Articles',
        devtoAPIKey: process.env.DEVTO_API_KEY,
      },
    },
    {
      use: 'gridsome-plugin-svg',
    },
  ],
  transformers: {
    remark: {
      plugins: ['@gridsome/remark-prismjs'],
    },
  },
}
