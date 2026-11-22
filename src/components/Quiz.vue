<script setup>
import { computed, ref } from 'vue'
import { shuffle } from '../lib'

const { tasks } = defineProps({ tasks: Array })
const order = ref(shuffle(tasks))
const index = ref(0)
const revealed = ref([])
const task = computed(() => order.value[index.value])
const answers = computed(() => shuffle([
  ...(task.value.answers.correct ?? []).map((text) => ({ text, correct: true })),
  ...(task.value.answers.incorrect ?? []).map((text) => ({ text, correct: false })),
]))

function go(step) {
  const next = index.value + step
  if (next >= order.value.length) order.value = shuffle(tasks) // finished a round: reshuffle
  index.value = (next + order.value.length) % order.value.length
  revealed.value = []
}
const color = (a, i) => (revealed.value.includes(i) ? (a.correct ? 'success' : 'error') : 'neutral')
const icon = (a, i) => revealed.value.includes(i) && (a.correct ? 'i-lucide-check' : 'i-lucide-x')
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <div class="flex justify-between text-sm text-muted">
        <span>Otázka</span><span class="tabular-nums">{{ index + 1 }} / {{ order.length }}</span>
      </div>
      <UProgress :model-value="index + 1" :max="order.length" size="xs" />
    </div>
    <div v-math="task.title" class="text-lg font-medium text-highlighted" />
    <div class="grid gap-2">
      <UButton v-for="(a, i) in answers" :key="`${index}-${i}`" :color="color(a, i)" :trailing-icon="icon(a, i) || undefined"
        :variant="revealed.includes(i) ? 'soft' : 'outline'" size="lg" block
        class="justify-between text-left font-normal whitespace-normal" @click="revealed.push(i)">
        <span v-math="a.text" />
      </UButton>
    </div>
    <div class="flex justify-between">
      <UButton color="neutral" variant="outline" icon="i-lucide-arrow-left" @click="go(-1)">Předchozí</UButton>
      <UButton trailing-icon="i-lucide-arrow-right" @click="go(1)">Další otázka</UButton>
    </div>
  </div>
</template>
