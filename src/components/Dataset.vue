<script setup>
import { computedAsync } from '@vueuse/core'
import { datasets, input, label, mode, showIncorrect } from '../lib'
import Search from './Search.vue'
import Quiz from './Quiz.vue'

const { path } = defineProps({ path: String })
const data = computedAsync(() => datasets[path]?.())
const headline = path.split('/').slice(0, -1).map(label).join(' / ')
</script>

<template>
  <UPageHeader v-if="!datasets[path]" title="Tato stránka neexistuje" description="Vyberte test v menu." />
  <template v-else-if="data">
    <UPageHeader :headline="headline" :title="data.title" :description="data.description" />
    <UPageBody>
      <Quiz v-if="mode === 'quiz'" :tasks="data.tasks" />
      <div v-else class="space-y-4">
        <div class="sticky top-(--ui-header-height) z-10 -mx-1 flex items-center gap-4 bg-default/75 px-1 py-3 backdrop-blur">
          <UInput v-model="input" icon="i-lucide-search" placeholder="Hledejte mezi otázkami" autofocus class="flex-1" />
          <USwitch v-model="showIncorrect" label="Nesprávné" />
        </div>
        <Search :tasks="data.tasks" />
      </div>
    </UPageBody>
  </template>
</template>
