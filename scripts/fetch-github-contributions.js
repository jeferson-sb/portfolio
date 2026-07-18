import fs from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'

const outputPath = path.resolve('content/github/contributions.json')

const excludeList = [
  'bradtraversy/vanilla-parcel-boilerplate',
  'bradtraversy/design-resources-for-developers',
  'denolib/awesome-deno',
  'is-a-dev/register',
  'talyssonoc/node-api-boilerplate',
  'Evavic44/portfolio-ideas',
]

const contributedReposQuery = `
  query {
    search(query: "author:jeferson-sb type:pr is:merged -user:jeferson-sb", type: ISSUE, first: 100) {
      nodes {
        ... on PullRequest {
          repository {
            nameWithOwner
            url
            description
            isPrivate
            stargazerCount
            primaryLanguage {
              name
            }
            owner {
              login
            }
          }
        }
      }
    }
  }
`

async function readExisting() {
  try {
    return JSON.parse(await fs.readFile(outputPath, 'utf-8'))
  } catch {
    return []
  }
}

async function write(repositories) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, `${JSON.stringify(repositories, null, 2)}\n`)
}

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '')
const token = env.GITHUB_TOKEN

if (!token) {
  console.warn(
    '⚠️  GITHUB_TOKEN not set, skipping GitHub contributions fetch.'
  )
  await write(await readExisting())
  process.exit(0)
}

try {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query: contributedReposQuery }),
  })

  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`)
  }

  const { data, errors } = await response.json()

  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join('; '))
  }

  const seen = new Set()
  const repositories = []

  for (const { repository } of data.search.nodes) {
    if (repository.isPrivate) continue
    if (excludeList.includes(repository.nameWithOwner)) continue
    if (seen.has(repository.nameWithOwner)) continue

    seen.add(repository.nameWithOwner)
    repositories.push(repository)
  }

  await write(repositories)
  console.log(
    `✅ Wrote ${repositories.length} GitHub contributions to ${outputPath}`
  )
} catch (error) {
  console.warn(`⚠️  Failed to fetch GitHub contributions: ${error.message}`)
  await write(await readExisting())
}
