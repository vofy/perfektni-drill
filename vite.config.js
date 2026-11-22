import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

const commit = (() => {
  try { return execSync('git rev-parse --short HEAD').toString().trim() } catch { return 'dev' }
})()

// The GitHub Pages base path (e.g. /perfektni-drill/) is passed via `--base` in CI.
export default defineConfig({
  define: { __COMMIT__: JSON.stringify(commit) },
  plugins: [vue(), ui({ ui: { colors: { primary: 'neutral', neutral: 'neutral' } } })],
})
