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
        typeName: 'ProjectPost',
        resolveAbsolutePaths: true,
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
        },
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
