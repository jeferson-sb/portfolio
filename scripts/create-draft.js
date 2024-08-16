import fs from 'node:fs/promises'
import path from 'node:path'
import readline from 'node:readline/promises'

const defaults = {
  id: Math.floor(Math.random() * 1e15).toString(36),
  published_at: new Date().toISOString(),
  excerpt: '',
  crosspostedOn: '',
  crosspostLink: '',
}

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const title = await rl.question("What's the title of your post? ")
const tags = await rl.question(
  'Add the tags you would like? (separated by comma) '
)

rl.close()

const slug = slugify(title)

const dir = path.resolve('.')
const filename = `${slug}.md`
const output = path.join(dir, 'content/articles', filename)

console.log('\n✍️ Drafting new doc...\n')

try {
  const post = {
    ...defaults,
    title,
    tags,
    slug,
  }
  let frontmatter = '---\n'

  for (const [k, v] of Object.entries(post)) {
    frontmatter += `${k}: ${v}\n`
  }

  frontmatter += '---\n'

  await fs.writeFile(output, frontmatter, {
    encoding: 'utf-8',
  })
  console.log('✅ Open: ', output)
} catch (error) {
  console.error(error)
}
