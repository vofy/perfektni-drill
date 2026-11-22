<script setup>
const memes = Object.entries(import.meta.glob('../memes/*', { eager: true, query: '?url', import: 'default' }))
const [file, src] = memes[Math.floor(Math.random() * memes.length)]
const alt = file.split('/').pop().split('.')[0]
</script>

<template>
  <div class="flex flex-col gap-6 py-10">
    <div class="space-y-3">
      <h1 class="text-4xl font-medium text-highlighted">Vítejte na perFEKTním drillu</h1>
      <p class="text-lg text-muted">Vyhledávání a procvičování testových otázek z FEKT VUT. Vyberte test v menu.</p>
    </div>
    <img class="max-h-[60vh] self-start rounded-md border border-default" :src="src" :alt="alt" />
  </div>
</template>
