// This is where project configuration and installed plugin options are located.
// Learn more: https://gridsome.org/docs/config
const path = require('path');

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/scss/_variables.scss')],
    });
}

module.exports = {
  siteName: 'Fullstack Developer & Designer',
  siteUrl: `https://jefersonsilva.me`,
  titleTemplate: '%s - Jeferson S. Brito',
  siteDescription: "I'm a Fullstack Developer and UI Designer",
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
  ],
  transformers: {
    remark: {
      plugins: ['@gridsome/remark-prismjs'],
    },
  },
  chainWebpack(config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type));
    });
  },
};
