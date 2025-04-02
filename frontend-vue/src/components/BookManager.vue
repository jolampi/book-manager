<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { createBook, deleteBook, getBooks, updateBook } from '../services/backend'
import type { Book, NewBook } from '../services/backend.types'
import BookPicker from './BookPicker.vue'
import BookEditor from './BookEditor.vue'
import { useQuery } from '@/composable/useQuery'

const { data: books, error, refresh } = useQuery(getBooks, [])
const selected = ref<Book | null>(null)

watchEffect(async () => {
  books.value = await getBooks()
})

async function handleCreate(newBook: NewBook) {
  await createBook(newBook)
  await refresh()
}

async function handleUpdate(book: Book) {
  await updateBook(book.id, book)
  await refresh()
  selected.value = books.value.find((x) => x.id === book.id) ?? null
}

async function handleDelete(id: number) {
  await deleteBook(id)
  await refresh()
  selected.value = null
}
</script>

<template>
  <BookPicker :books="books" v-model="selected" />
  <BookEditor
    :book="selected"
    @create="handleCreate"
    @update="handleUpdate"
    @delete="handleDelete"
  />
  <div v-if="error">
    {{ error }}
  </div>
</template>
