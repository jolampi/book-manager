<script setup lang="ts">
import { ref } from 'vue'
import type { Book, NewBook } from '../services/backend.types'
import BookPicker from './BookPicker.vue'
import BookEditor from './BookEditor.vue'
import { useBooks } from '@/composable/useBooks'

const { books, create, update, remove } = useBooks()
const selected = ref<Book | null>(null)

async function handleCreate(book: NewBook) {
  await create(book)
  const created = books.value.find((x) => x.author === book.author && x.title === book.title)
  selected.value = created ?? null
}

async function handleUpdate(book: Book) {
  await update(book)
  const updated = books.value.find((x) => x.id === book.id)
  selected.value = updated ?? null
}

async function handleDelete(id: number) {
  await remove(id)
  selected.value = null
}
</script>

<template>
  <BookPicker :books="books" empty-label="(New Book)" v-model="selected" />
  <BookEditor
    :book="selected"
    @create="handleCreate"
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>
