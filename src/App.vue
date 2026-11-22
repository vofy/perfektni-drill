<script setup>
import { useRoute } from 'vue-router'
import { cs } from '@nuxt/ui/locale'
import { mode } from './lib'
import Sidebar from './components/Sidebar.vue'
import ColorModeButton from './components/ColorModeButton.vue'

const route = useRoute()
const base = import.meta.env.BASE_URL
const repo = 'https://github.com/vofy/perfektni-drill'
const commit = __COMMIT__
const modes = [
  { label: 'Hledání', value: 'search', icon: 'i-lucide-search' },
  { label: 'Drill', value: 'quiz', icon: 'i-lucide-dumbbell' },
]
</script>

<template>
  <UApp :locale="cs">
    <UHeader to="/">
      <template #title>
        <img :src="`${base}drill.svg`" class="size-6 invert dark:invert-0" alt="" />
        <span class="font-semibold">PerFEKTní drill</span>
      </template>
      <template #right>
        <UFieldGroup v-if="route.path !== '/'">
          <UButton v-for="m in modes" :key="m.value" :icon="m.icon" color="neutral" :aria-pressed="mode === m.value"
            :variant="mode === m.value ? 'subtle' : 'outline'" :label="m.label" :ui="{ label: 'sr-only sm:not-sr-only' }" @click="mode = m.value" />
        </UFieldGroup>
        <ColorModeButton />
      </template>
      <template #body><Sidebar /></template>
    </UHeader>
    <UMain>
      <UContainer>
        <UPage>
          <template #left><UPageAside><Sidebar /></UPageAside></template>
          <RouterView :key="route.path" />
        </UPage>
      </UContainer>
    </UMain>
    <UFooter class="border-t border-default">
      <template #left>
        <span class="text-sm text-muted">Made with ♥︎ by <ULink to="https://github.com/vofy" target="_blank" class="font-medium">vofy</ULink></span>
      </template>
      <template #right>
        <UButton :to="repo" target="_blank" icon="i-lucide-github" color="neutral" variant="ghost" size="sm">vofy/perfektni-drill</UButton>
        <UBadge as="a" :href="`${repo}/commit/${commit}`" target="_blank" color="neutral" variant="outline" class="font-mono">{{ commit }}</UBadge>
      </template>
    </UFooter>
  </UApp>
</template>
