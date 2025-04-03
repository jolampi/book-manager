<script setup lang="ts">
import type { Book, NewBook } from '@/services/backend.types'
import { watch } from 'vue'

type Form = NewBook

const props = defineProps<{
  book: Book | null
}>()
const emit = defineEmits<{
  create: [NewBook]
  update: [Book]
  delete: [number]
}>()
const form: Form = {
  author: '',
  description: '',
  title: '',
}

watch(props, ({ book }) => {
  form.author = book?.author ?? ''
  form.description = book?.description ?? ''
  form.title = book?.title ?? ''
})

function onCreate() {
  emit('create', {
    author: form.author,
    description: form.description,
    title: form.title,
  })
}

function onUpdate() {
  if (props.book) {
    const id = props.book.id
    emit('update', { ...mapData(), id })
  }
}

function onDelete() {
  if (props.book) {
    const id = props.book.id
    emit('delete', id)
  }
}

function mapData(): NewBook {
  return {
    author: form.author,
    description: form.description,
    title: form.title,
  }
}
</script>

<template>
  <div class="section">
    <label for="title-input">Title</label>
    <input type="text" id="title-input" v-model="form.title" />
  </div>

  <div class="section">
    <label for="author-input">Author</label>
    <input type="text" id="author-input" v-model="form.author" />
  </div>

  <div class="section">
    <label for="description-input">Description</label>
    <input type="textarea" id="description-input" v-model="form.description" />
  </div>

  <div class="buttons">
    <button @click="onCreate">Create</button>
    <button @click="onUpdate" :disabled="props.book === null">Update</button>
    <button @click="onDelete" :disabled="props.book === null">Delete</button>
  </div>
</template>

<style scoped>
.section {
  display: block;
  margin-bottom: 10px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 25px;
}

input {
  box-sizing: border-box;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 0.3rem;
}
</style>
