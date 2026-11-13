import { appendFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const token = process.env.AZURE_ARTIFACTS_PAT
if (!token) {
  console.error('Missing AZURE_ARTIFACTS_PAT. Add the repository Actions secret before publishing.')
  process.exit(1)
}

const encoded = Buffer.from(token, 'utf8').toString('base64')
const registry = '//pkgs.dev.azure.com/StrongTie/_packaging/Simpson/npm/'
const lines = [
  `${registry}registry/:username=StrongTie`,
  `${registry}registry/:_password=${encoded}`,
  `${registry}registry/:email=build@example.invalid`,
  `${registry}:username=StrongTie`,
  `${registry}:_password=${encoded}`,
  `${registry}:email=build@example.invalid`,
]

appendFileSync(join(homedir(), '.npmrc'), `\n${lines.join('\n')}\n`, { mode: 0o600 })
console.log('Configured npm authentication for the StrongTie package feed.')
