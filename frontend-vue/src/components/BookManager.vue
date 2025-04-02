<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { createBook, deleteBook, getBooks, updateBook } from '../services/backend'
import type { Book, NewBook } from '../services/backend.types'
import BookPicker from './BookPicker.vue'
import BookEditor from './BookEditor.vue'

const books = ref<Book[]>([])
const selected = ref<Book | null>(null)

watchEffect(async () => {
  books.value = await getBooks()
})

async function handleCreate(newBook: NewBook) {
  await createBook(newBook)
  books.value = await getBooks()
}

async function handleUpdate(book: Book) {
  await updateBook(book.id, book)
  selected.value = null
  books.value = await getBooks()
}

async function handleDelete() {
  if (!selected.value) {
    return
  }
  await deleteBook(selected.value.id)
  selected.value = null
  books.value = await getBooks()
}
</script>

<template>
  <BookPicker :books v-model="selected" />
  <BookEditor
    :book="selected"
    @create="handleCreate"
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>
