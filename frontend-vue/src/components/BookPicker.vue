<script setup lang="ts">
import type { Book } from '@/services/backend.types'

const selected = defineModel<Book | null>()
const props = defineProps<{
  books: Book[]
}>()
</script>

<template>
  <select size="5" v-model="selected">
    <option :value="null">(New book)</option>
    <option v-for="book in props.books" :key="book.id" :value="book">
      {{ book.title }} ({{ book.author }})
    </option>
  </select>
</template>
