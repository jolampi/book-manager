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
  delete: []
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
    emit('update', {
      id: props.book.id,
      author: form.author,
      description: form.description,
      title: form.title,
    })
  }
}

function onDelete() {
  if (props.book) {
    emit('delete')
  }
}
</script>

<template>
  <div>
    <label for="title-input">Title</label>
    <input type="text" id="title-input" v-model="form.title" />
  </div>

  <div>
    <label for="author-input">Author</label>
    <input type="text" id="author-input" v-model="form.author" />
  </div>

  <div>
    <label for="description-input">Description</label>
    <input type="textarea" id="description-input" v-model="form.description" />
  </div>

  <div>
    <button @click="onCreate">Create</button>
    <button @click="onUpdate" :disabled="props.book === null">Update</button>
    <button @click="onDelete" :disabled="props.book === null">Delete</button>
  </div>
</template>
