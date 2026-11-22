import { ref } from 'vue'
import { refDebounced, useStorage } from '@vueuse/core'

// Every JSON file in ./data is a dataset; its path (e.g. "bpc/mpe/zkouska") is also its URL.
const files = import.meta.glob('./data/**/*.json', { import: 'default' })
export const datasets = Object.fromEntries(
  Object.entries(files).map(([file, load]) => [file.slice('./data/'.length, -'.json'.length), load])
)

// Nested tree built from dataset paths: { bpc: { mpe: { lc: { 8: 'bpc/mpe/lc/8' }, zkouska: '...' } } }
const tree = {}
for (const path of Object.keys(datasets)) {
  const parts = path.split('/')
  const leaf = parts.pop()
  parts.reduce((node, part) => (node[part] ??= {}), tree)[leaf] = path
}

const LABELS = {
  zkouska: 'Zkouška', kt: 'Kontrolní test', zt: 'Závěrečný test', test: 'Test', testy: 'Testy',
  194: 'NV 194/2022 Sb.', '42a45': '42 a 45',
}
export const label = (key) => LABELS[key] ?? key.toUpperCase()

// Navigation items for UNavigationMenu: one group per programme (BPC, XPC), folders first, numbers in natural order.
const sorted = (node) => Object.entries(node).sort(([a, x], [b, y]) =>
  (typeof x === 'string') - (typeof y === 'string') || a.localeCompare(b, 'cs', { numeric: true }))
// Folders containing `current` (the open dataset path) start expanded.
const toItems = (node, current, prefix) => sorted(node).map(([key, value]) => typeof value === 'string'
  ? { label: label(key), to: `/${value}` }
  : { label: label(key), defaultOpen: current.startsWith(`${prefix}${key}/`), children: toItems(value, current, `${prefix}${key}/`) })
export const menu = (current) => sorted(tree).map(([key, value]) =>
  [{ label: label(key), type: 'label' }, ...toItems(value, current, `${key}/`)])

// Global app state; settings persist in localStorage.
export const mode = useStorage('mode', 'search')
export const showIncorrect = useStorage('showIncorrectAnswers', false)
export const input = ref('')
export const query = refDebounced(input, 300)

export function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// v-math="html": renders trusted dataset HTML, fixes root-relative image paths for the
// deploy base path and renders \( inline \) and \[ display \] LaTeX with KaTeX.
const delimiters = [
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true },
]
// KaTeX (JS + CSS) is loaded only once some text actually contains a formula.
let katex
const loadKatex = () => (katex ??= Promise.all([import('katex/contrib/auto-render'), import('katex/dist/katex.min.css')]))
const render = (el, { value = '' }) => {
  el.innerHTML = value.replace(/(src=["'])\//g, `$1${import.meta.env.BASE_URL}`)
  if (/\\[([]/.test(value)) loadKatex().then(([{ default: renderMath }]) => renderMath(el, { delimiters, throwOnError: false }))
}
export const vMath = { mounted: render, updated: (el, b) => b.value !== b.oldValue && render(el, b) }
