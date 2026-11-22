<script setup>
import { computed, watch } from 'vue'
import Fuse from 'fuse.js'
import { query, showIncorrect } from '../lib'

const { tasks } = defineProps({ tasks: Array })
const fuse = new Fuse(tasks, {
  includeScore: true,
  ignoreLocation: true,
  findAllMatches: true,
  keys: [{ name: 'title', weight: 2 }, 'answers.correct'],
})
const results = computed(() => (query.value.trim() ? fuse.search(query.value.trim()) : tasks.map((item) => ({ item }))))
watch(results, () => window.scrollTo(0, 0))
</script>

<template>
  <div class="space-y-4">
    <p v-if="!results.length" class="text-muted">Nic nenalezeno.</p>
    <article v-for="({ item, score }, i) in results" :key="i" class="space-y-2 rounded-md border border-default p-4">
      <div class="flex items-start gap-3">
        <div v-math="item.title" class="flex-1 font-medium text-highlighted" />
        <UBadge v-if="score !== undefined" color="neutral" variant="subtle">{{ Math.round((1 - score) * 100) }} %</UBadge>
      </div>
      <div v-for="a in item.answers.correct" class="flex gap-2">
        <UIcon name="i-lucide-check" class="mt-1 shrink-0 text-success" /><div v-math="a" />
      </div>
      <template v-if="showIncorrect">
        <div v-for="a in item.answers.incorrect" class="flex gap-2 text-muted">
          <UIcon name="i-lucide-x" class="mt-1 shrink-0 text-error" /><div v-math="a" />
        </div>
      </template>
      <div v-if="item.comment" class="flex gap-2 border-t border-default pt-2 text-sm text-muted">
        <UIcon name="i-lucide-info" class="mt-0.5 shrink-0" /><div v-math="item.comment" />
      </div>
    </article>
  </div>
</template>
