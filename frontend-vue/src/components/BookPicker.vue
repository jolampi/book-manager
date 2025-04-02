<script setup lang="ts">
import type { Book } from '@/services/backend.types'

const selected = defineModel<Book | null>()
const props = defineProps<{
  books: Book[]
  emptyLabel?: string
}>()
</script>

<template>
  <select size="5" v-model="selected">
    <option :value="null">{{ emptyLabel }}</option>
    <option v-for="book in props.books" :key="book.id" :value="book">
      {{ book.title }} ({{ book.author }})
    </option>
  </select>
</template>
