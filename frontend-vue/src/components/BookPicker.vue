<script setup lang="ts">
import type { Book } from '@/services/backend.types'
import { computed } from 'vue'

const selected = defineModel<Book | null>()
const props = defineProps<{
  books: Book[]
  emptyLabel?: string
}>()
const selectorSize = computed(() => Math.max(props.books.length, 10))
</script>

<template>
  <select class="selector" :size="selectorSize" v-model="selected">
    <option :value="null">{{ emptyLabel }}</option>
    <option v-for="book in props.books" :key="book.id" :value="book">
      {{ book.title }} ({{ book.author }})
    </option>
  </select>
</template>

<style scoped>
.selector {
  max-height: 10rem;
  width: 100%;

  @media screen and (min-width: 550px) {
    max-height: none;
  }
}

label {
  display: block;
}
</style>
