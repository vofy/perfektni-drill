<script setup>
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

const { store } = useColorMode()
const modes = [
  { value: 'auto', label: 'Systém', icon: 'i-lucide-monitor' },
  { value: 'light', label: 'Světlý', icon: 'i-lucide-sun' },
  { value: 'dark', label: 'Tmavý', icon: 'i-lucide-moon' },
]
const current = computed(() => modes.find((m) => m.value === store.value) ?? modes[0])
const items = computed(() => modes.map((m) => ({
  ...m, type: 'checkbox', checked: m.value === store.value, onSelect: () => (store.value = m.value),
})))
</script>

<template>
  <UDropdownMenu :items="items" :content="{ align: 'end' }">
    <UButton :icon="current.icon" :aria-label="current.label" color="neutral" variant="outline" square />
  </UDropdownMenu>
</template>
