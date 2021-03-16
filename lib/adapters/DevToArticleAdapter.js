class DevToArticleAdapter {
  static transformFrontMatter(source) {
    return {
      id: source.id,
      title: source.title,
      slug: source.slug,
      published_at: source.published_at,
      tags: source.tag_list,
      excerpt: source.description,
      crosspostedOn: 'Dev.to',
      crosspostLink: source.url,
      url: source.url,
      path: `/articles/${source.slug}`,
      canonicalUrl: source.canonical_url,
      cover_image: source.cover_image,
    }
  }
}

module.exports = DevToArticleAdapter
