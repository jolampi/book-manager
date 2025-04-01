<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { createBook, deleteBook, getBooks, updateBook } from '../services/backend'
import type { Book, NewBook } from '@/services/backend.types'

const books = ref<Book[]>([])
const selected = ref<number | null>(null)
const selectedBook = computed<Book | null>(() => {
  return books.value.find((x) => x.id === selected.value) ?? null
})

const title = ref('')
const author = ref('')
const description = ref('')
watch(selectedBook, (book) => {
  title.value = book?.title ?? ''
  author.value = book?.author ?? ''
  description.value = book?.description ?? ''
})

watchEffect(async () => {
  books.value = await getBooks()
})

const handleCreate = async () => {
  const payload: NewBook = {
    title: title.value,
    author: author.value,
    description: description.value,
  }
  await createBook(payload)
  selected.value = null
  books.value = await getBooks()
}

const handleUpdate = async () => {
  if (!selected.value) {
    return
  }
  const payload: NewBook = {
    title: title.value,
    author: author.value,
    description: description.value,
  }
  await updateBook(selected.value, payload)
  selected.value = null
  books.value = await getBooks()
}

const handleDelete = async () => {
  if (!selected.value) {
    return
  }
  await deleteBook(selected.value)
  selected.value = null
  books.value = await getBooks()
}
</script>

<template>
  <select size="5" v-model="selected">
    <option v-for="book in books" :key="book.id" :value="book.id">
      {{ book.title }} ({{ book.author }})
    </option>
  </select>

  <div>
    <label for="title-input">Title</label>
    <input type="text" id="title-input" v-model="title" />
  </div>

  <div>
    <label for="author-input">Author</label>
    <input type="text" id="author-input" v-model="author" />
  </div>

  <div>
    <label for="descriotion-input">Description</label>
    <input type="textarea" id="description-input" v-model="description" />
  </div>

  <div>
    <button @click="handleCreate">Create</button>
    <button @click="handleUpdate" :disabled="selected === null">Update</button>
    <button @click="handleDelete" :disabled="selected === null">Delete</button>
  </div>
</template>
