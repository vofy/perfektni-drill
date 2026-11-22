<script setup>
import { useRoute } from 'vue-router'
import { menu } from '../lib'

const items = menu(useRoute().path.slice(1))
</script>

<template>
  <UNavigationMenu :items="items" orientation="vertical" highlight color="neutral" class="-mx-2.5" />
</template>
