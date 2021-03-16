const path = require('path')
const axios = require('axios')
const DevToArticleAdapter = require('./lib/adapters/DevToArticleAdapter')
const { writeFileOn, transformMarkdown } = require('./lib/md')

module.exports = function serverSetup(api) {
  api.loadSource(async (actions) => {
    const { data: articles } = await axios.get(
      'https://dev.to/api/articles/me/published',
      {
        headers: {
          'api-key': process.env.DEVTO_API_KEY,
        },
      }
    )

    articles.forEach(async (article) => {
      const fileName = `${article.slug}.md`
      const filePath = path.resolve(__dirname, 'articles', fileName)
      transformMarkdown(article, DevToArticleAdapter).then((data) =>
        writeFileOn(filePath, data)
      )
    })
  })
}
