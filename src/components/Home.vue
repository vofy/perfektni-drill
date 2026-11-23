<script setup>
const memes = Object.entries(import.meta.glob('../memes/*', { eager: true, query: '?url', import: 'default' }))
const [file, src] = memes[Math.floor(Math.random() * memes.length)]
const alt = file.split('/').pop().split('.')[0]
</script>

<template>
  <div class="flex flex-col gap-6 py-10">
    <div class="space-y-3">
      <h1 class="text-4xl font-medium text-highlighted">Vítejte na PerFEKTním drillu!</h1>
      <p class="text-lg text-muted">Vyhledávání a procvičování testových otázek z FEKT VUT. Vyberte test v menu.</p>
    </div>
    <UAlert
      color="warning"
      variant="subtle"
      icon="i-lucide-triangle-alert"
      title="Změna adresy"
    >
      <template #description>
        Drill se přesunul z domény fekt.tk na
        <a href="https://vofy.github.io/perfektni-drill/" class="font-medium underline">vofy.github.io/perfektni-drill</a>.
      </template>
    </UAlert>
    <figure class="flex flex-col items-center gap-3 rounded-lg border border-default bg-elevated/50 p-4">
      <figcaption class="text-muted">Tady máš náhodný meme, ať se ti dneska lépe drillí!</figcaption>
      <img class="max-h-[60vh] rounded-md border border-default" :src="src" :alt="alt" />
    </figure>
  </div>
</template>
