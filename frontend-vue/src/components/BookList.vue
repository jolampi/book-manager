<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { getBooks } from '../services/backend'

interface Book {
  id: number
  title: string
  author: string
  description: string
}

const books = ref<Book[]>([])

watchEffect(async () => {
  books.value = await getBooks()
})
</script>

<template>
  <ul>
    <li v-for="book in books" :key="book.id">{{ book.title }} ({{ book.author }})</li>
  </ul>
</template>
