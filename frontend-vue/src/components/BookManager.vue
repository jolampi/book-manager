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
  <div class="container">
    <div class="flex">
      <BookEditor
        :book="selected"
        @create="handleCreate"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>
    <div class="flex">
      <BookPicker :books="books" empty-label="(New Book)" v-model="selected" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  column-gap: 1.5rem;
  flex-direction: column-reverse;
  margin: 20px;
  row-gap: 2rem;

  @media screen and (min-width: 550px) {
    flex-direction: row;
  }
}

.flex {
  flex: 1;
}
</style>
