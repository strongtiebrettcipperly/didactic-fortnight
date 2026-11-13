import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages use /<repo>/; user or organization Pages use /.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repository && !repository.endsWith('.github.io')
  ? `/${repository}/`
  : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
