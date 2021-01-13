const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    const { data: articles } = await axios(
      'https://dev.to/api/articles/me/published',
      {
        headers: {
          'api-key': process.env.DEVTO_API_KEY,
        },
      }
    )

    const collection = addCollection({
      typeName: 'Articles',
    })

    articles.forEach((article) => collection.addNode(article))
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
